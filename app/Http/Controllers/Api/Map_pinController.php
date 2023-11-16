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
            // $map_pin->type_id = $request->input('type_id');
            // $map_pin->creator_id = $request->input('creator_id');
            // $map_pin->video = $request->input('video');
            // $map_pin->image = $request->input('image');
            $map_pin->save();
    
            return
                response()->json(['message' => 'Pin updated succesfully']);
    }
}
