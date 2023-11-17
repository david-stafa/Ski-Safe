<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Map_pin;
use Illuminate\Http\Request;

class Map_pinController extends Controller
{
    public function index()
    {
        $map_pins = Map_pin::with('severity')->get();

        return $map_pins;
    }

    //******************delete & edit From Joe */
    public function delete($id)
    {
        $map_pin = Map_pin::findOrFail($id);
        $map_pin->delete();

        return response()->json(['message' => 'Pin deleted succesfully'], 200);
    }

    public function edit(Request $request, $id)
    {

        $request->validate([
            'title' => 'required',
            'severity' => 'required',
            'slug' => 'required',
            'description' => 'required',
        ]);

        $map_pin = Map_pin::with('severity')->find($id);

        if (!$id) {
            return
                response()->json(['message' => 'There was an error finding your pin'], 404);

        }

        $map_pin->title = $request->input('title');
        $map_pin->severity_id = $request->input('severity_id');
        $map_pin->slug = $request->input('slug');
        // $map_pin->type_id = $request->input('type_id');
        // $map_pin->creator_id = $request->input('creator_id');
        $map_pin->video = $request->input('video');
        $map_pin->image = $request->input('image');
        $map_pin->save();

        return
            response()->json(['message' => 'Pin updated succesfully']);
        ;
    }


    public function show($mission_id)
    {
        $mission = Map_pin::with('severity')->findOrFail($mission_id);

        return ($mission);
    }
    //end of edit & delete ************************
}
