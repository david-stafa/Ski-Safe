<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Map_pin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Termwind\Components\Dd;

use function Laravel\Prompts\error;

class Map_pinController extends Controller
{
    public function index()
    {
        $map_pins = Map_pin::with('severity')->get();

        return $map_pins;
    }

    public function getHazards()
    {
        $map_pins = Map_pin::with('severity')->where('type_id', 1)->get();

        return $map_pins;
    }

    public function edit(Request $request, $id)
    {

        $map_pin = Map_pin::findOrFail($id);

        // $request->validate([
        //     'title' => 'required',
        //     // 'severity' => 'required',
        //     // 'slug' => 'required',
        //     'description' => 'required',
        // ]);

        // if (!$id) {
        //     return
        //         response()->json(['message' => 'There was an error finding your pin'], 404);

        // }

        $map_pin->title = $request->input('title');
        $map_pin->description = $request->input('description');
        $map_pin->longitude = $request->input('longitude');
        $map_pin->latitude = $request->input('latitude');
        $map_pin->severity_id = $request->input('severity_id');
        $map_pin->slug = $request->input('slug');
        $map_pin->active = $request->input('active');
        // $map_pin->type_id = $request->input('type_id');
        // $map_pin->creator_id = $request->input('creator_id');
        // $map_pin->video = $request->input('video');
        // $map_pin->images = $request->input('images');
        $map_pin->update();

        return response()->json(['message' => 'Pin updated succesfully']);


    }

    public function store(Request $request)
    {

        $request->validate([
            'title' => 'required',
            // 'severity' => 'required',
            // 'slug' => 'required',
            'description' => 'required',
        ]);

        $map_pin = new Map_pin;

        $map_pin->title = $request->input('title');
        $map_pin->description = $request->input('description');
        $map_pin->longitude = $request->input('longitude');
        $map_pin->latitude = $request->input('latitude');
        $map_pin->severity_id = $request->input('severity_id');
        $map_pin->slug = $request->input('slug');
        $map_pin->active = $request->input('active');
        $map_pin->images = $request->input('images');
        // $map_pin->type_id = $request->input('type_id');
        // $map_pin->creator_id = $request->input('creator_id');
        // $map_pin->video = $request->input('video');
        $map_pin->save();

        return
            response()->json(['message' => 'Pin updated succesfully']);
    }


    public function delete($id)
    {
        $map_pin = Map_pin::findOrFail($id);
        $map_pin->delete();

        return response()->json(['message' => 'Pin deleted succesfully'], 200);
    }

    public function show($mission_id)
    {
        $mission = Map_pin::with('severity')->findOrFail($mission_id);

        return ($mission);
    }
    //end of edit & delete ************************
}
