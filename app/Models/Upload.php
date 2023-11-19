<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Upload extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image',
        'description',
        'user_id',
        'is_profile_picture'
    ];

    public function user()
    {
        // return $this->belongsTo('App\Models\User', 'user_id');
        return $this->belongsTo(User::class);
    }

    public function getUpload($id) {
    $upload = Upload::with('user')->find($id);

    if ($upload) {
        return response()->json($upload);
    } else {
        return response()->json(['message' => 'Upload not found'], 404);
    }
}
}
