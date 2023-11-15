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
}