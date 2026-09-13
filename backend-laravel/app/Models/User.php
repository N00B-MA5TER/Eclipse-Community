<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    protected $connection = 'mongodb';
    protected $collection = 'users';
    
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'bio',
        'course',
        'year',
        'techSkills',
        'role',
        'teamId',
        'registrationId',
        'uid',
        'oauthProviders',
        'oauth_handoff',
        'avatar',
        'email_verified_at',
    ];

    protected $keyType = 'string';
    public $incrementing = false;
    protected $primaryKey = '_id';

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    
}
