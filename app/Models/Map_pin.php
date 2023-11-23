<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Map_pin extends Model
{
    use HasFactory;

    protected $table = "map_pins";

    public function severity()
    {
        return $this->belongsTo(Severity::class);
    }

    public function uploads()
    {
        return $this->hasMany(Upload::class);
    }
}
