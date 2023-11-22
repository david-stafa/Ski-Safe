<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Forum_post extends Model
{
    use HasFactory;

    protected $fillable = ['content', 'user_id', 'forum_thread_id'];

    public function forum_threads()
    {
        return $this->belongsTo(Forum_thread::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
