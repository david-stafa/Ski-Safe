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
        // $messages = Message::all();
        $forumThreads = Forum_thread::orderBy('created_at', 'desc') // 'desc' for descending order, 'asc' for ascending order
        ->with('forum_post.user.uploads', 'user.uploads')
        ->get();

        return ($forumThreads);
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
        $forumThread = Forum_thread::with('forum_post.user.uploads', 'user.uploads')->findOrFail($id);

        return $forumThread;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string'
        ]);

        $thread = Forum_thread::findOrFail($id);
        $thread->title = $request->input('title');
        $thread->content = $request->input('content');
        $thread->user_id = $request->input('user_id');
        $thread->update();

        return response()->json($thread, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $thread = Forum_thread::findOrFail($id);

        if (!$thread) {
            return response()->json([
                'message' => "Image not found!"
            ], 404);
        }
        
        $thread->delete();

        return response()->json(null, 204);
    }
}
