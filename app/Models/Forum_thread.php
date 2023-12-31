<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Forum_thread extends Model
{
    protected $fillable = ['title', 'content', 'user_id'];
    
    use HasFactory;

    public function forum_post()
    {
        return $this->hasMany(Forum_post::class);
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
