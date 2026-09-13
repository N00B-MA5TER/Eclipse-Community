<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $keyType = 'string';
    public $incrementing = false;
    protected $primaryKey = '_id';


    protected $fillable = [
        'eventId',
        'name',
        'code',
        'leader',
        'members',
        'memberIds',
        'pendingMembers',
        'maxMembers',
        'projectLink',
        'projectSubmittedAt'
    ];

    protected $casts = [
        'projectSubmittedAt' => 'datetime',
        'leader' => 'array',
        'members' => 'array',
        'memberIds' => 'array',
        'pendingMembers' => 'array',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class, 'eventId', '_id');
    }
}
