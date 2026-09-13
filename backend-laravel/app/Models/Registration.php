<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $keyType = 'string';
    public $incrementing = false;
    protected $primaryKey = '_id';


    protected $fillable = [
        'eventId',
        'userId',
        'name',
        'email',
        'status'
    ];
}
