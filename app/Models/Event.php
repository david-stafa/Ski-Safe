<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'start_date', 'end_date','creator_id' 
    ];

    protected $dates = ['start_date', 'end_date'];

    public static $rules = [
        'title' => 'required|string',
        'description' => 'required|string',
        'start_date' => 'required|date',
        'end_date' => 'required|date',
        'creator_id' => 'required|exists:users,id',
    ];

    public function getStartDateAttribute($value)
    {
        return $this->asDateTime($value)->format('Y-m-d H:i:s');
    }

    public function getEndDateAttribute($value)
    {
        return $this->asDateTime($value)->format('Y-m-d H:i:s');
    }
}
