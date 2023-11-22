<?php

namespace App\Http\Controllers;

use App\Models\Forum_thread;
use Illuminate\Http\Request;

class ThreadsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedThread = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string'
        ]);

        $thread = Forum_thread::create([
            'title' => $validatedThread['title'],
            'content' => $validatedThread['content'],
            'user_id' => $request['user_id'],
            // 'user_id' => Auth::id(),
        ]);

        return response()->json($thread, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
