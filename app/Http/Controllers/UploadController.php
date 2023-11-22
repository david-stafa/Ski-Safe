<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Upload;
use App\Http\Requests\UploadStoreRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Map_pin;

class UploadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $uploads = Upload::all();
        $uploads = Upload::with('user')->get();

        return response()->json(['uploads' => $uploads], 200);
    }

    public function getUserUploads() {
        $uploads = Upload::where('user_id', Auth::id())->get();
        return response()->json(['uploads' => $uploads], 200);
    }

    public function setAsProfilePicture($id)
{
    $user = Auth::user();
    $upload = Upload::find($id);

    if (!$upload || $upload->user_id !== $user->id) {
        return response()->json(['message' => 'Upload not found or unauthorized'], 404);
    }

    
    Upload::where('user_id', $user->id)->update(['is_profile_picture' => false]);

 
    $upload->is_profile_picture = true;
    $upload->save();

    return response()->json(['message' => 'Profile picture updated successfully']);
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

            $mapPinId = $request->input('map_pin_id', null);
            $mapPin = null;
            if ($mapPinId) {
                $mapPin = Map_pin::find($mapPinId);
            }

            // Create
         Upload::create([
            'name' => $mapPin ? $mapPin->title : $request->name,
            'image' => $imageName,
            'description' => $mapPin ? $mapPin->description : $request->description,
            'user_id' => Auth::id(),
            'map_pin_id' => $mapPinId,
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

             if ($request->has('map_pin_id')) {
            $upload->map_pin_id = $request->input('map_pin_id');
        }

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


    public function getUploadsWithUserEmail() 
    {
        $uploads = Upload::with('user')->get();
        return response()->json($uploads);
    }
}
