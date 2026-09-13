<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $keyType = 'string';
    public $incrementing = false;
    protected $primaryKey = '_id';


    protected $fillable = [
        'title',
        'type',
        'date',
        'time',
        'description',
        'status',
        'registered_count',
        'team_count'
    ];

}
