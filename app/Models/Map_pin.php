<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Map_pin extends Model
{
    use HasFactory;

    public function severity()
    {
        return $this->belongsTo(Severity::class);
    }

}
