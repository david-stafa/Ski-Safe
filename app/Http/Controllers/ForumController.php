<?php

namespace App\Http\Controllers;

use App\Models\Forum_thread;
use Illuminate\Http\Request;


class ForumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       // $messages = Message::all();
       $forumThreads = Forum_thread::with('forum_post', 'user')->get();
       
        return ($forumThreads);
    }

    public function show(string $id)
    {
        $forumThread = Forum_thread::with('forum_post', 'user')->findOrFail($id);

        return $forumThread;
    }



}
