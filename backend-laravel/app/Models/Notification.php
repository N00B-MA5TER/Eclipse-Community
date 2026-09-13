<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $keyType = 'string';
    public $incrementing = false;
    protected $primaryKey = '_id';

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';

    protected $fillable = [
        'userId',
        'targetRole',
        'title',
        'message',
        'type',
        'read',
        'link'
    ];

}
