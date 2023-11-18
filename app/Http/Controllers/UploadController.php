<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Upload;
use App\Http\Requests\UploadStoreRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $uploads = Upload::all();

        return response()->json(['uploads' => $uploads], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UploadStoreRequest $request)
    {
        try {
            $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();

            // Create
            Upload::create([
                'name' => $request->name,
                'image' => $imageName,
                'description' => $request->description
            ]);

            // Save in floder
            Storage::disk('public')->put($imageName, file_get_contents($request->image));

            return response()->json(['message' => 'Image successfully uploaded!'],200);

        } catch (\Exception $e) {
            return response()->json(['message' => "Oops, something went wrong!"],500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Upload detail
        $upload = Upload::find($id);
        if(!$upload){
            return response()->json([
                'message' => 'Image Not Found.'
            ],404);
        }

        return response()->json([
            'upload' => $upload
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UploadStoreRequest $request, $id)
    {
        try {
            // Find image
            $upload = Upload::find($id);
            if(!$upload){
                return response()->json([
                    'message' => 'Oops, Image not found!'
                ],404);
            }

            // echo "request : $request->name"; working!
            // echo "description : $request->description";
            $upload->name = $request->name;
            $upload->description = $request->description;

            if($request->image) {
                $storage = Storage::disk('public');

                // delete old image
                if($storage->exists($upload->image))
                    $storage->delete($upload->image);

                $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();
                $upload->image = $imageName;

                $storage->put($imageName, file_get_contents($request->image));
            }

            $upload->save();


            return response()->json([
                'message' => "Image successfully updated."
            ],200);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Something went terribly wrong!'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $upload = Upload::find($id);
        if(!$upload){
            return response()->json([
                'message' => "Image not found!"
            ],404);
        }

        $storage = Storage::disk('public');

        if($storage->exists($upload->image))
            $storage->delete($upload->image);

        $upload->delete();

        return response()->json([
            'message' => "Image successfully deleted!"
        ], 200);
    }
}
