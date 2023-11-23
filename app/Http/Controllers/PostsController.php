<?php

namespace App\Http\Controllers;

use App\Models\Forum_post;
use Illuminate\Http\Request;

class PostsController extends Controller
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
            'content' => 'required|string'
        ]);

        $thread = Forum_post::create([
            'content' => $validatedThread['content'],
            'forum_thread_id' => $request['forum_thread_id'],
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
        $post = Forum_post::findOrFail($id);

        if (!$post) {
            return response()->json([
                'message' => "Image not found!"
            ], 404);
        }

        $post->delete();

        return response()->json(null, 204);
    }
}
