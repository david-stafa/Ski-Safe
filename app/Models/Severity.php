<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Severity extends Model
{
    use HasFactory;

    public function mapPins()
    {
        return $this->hasMany(Map_pin::class);
    }
}
