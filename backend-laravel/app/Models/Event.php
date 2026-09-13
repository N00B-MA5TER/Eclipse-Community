<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'type',
        'date',
        'time',
        'description',
        'status',
        'registered_count',
        'team_count',
    ];

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    public function teams()
    {
        return $this->hasMany(Team::class);
    }
}
