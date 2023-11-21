<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Forum_post extends Model
{
    use HasFactory;

    public function forum_threads()
    {
        return $this->belongsTo(Forum_thread::class);
    }
}
