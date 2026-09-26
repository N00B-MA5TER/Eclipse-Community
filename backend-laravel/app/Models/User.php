<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Auth\Notifications\ResetPassword;

#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'uid',
        'name',
        'email',
        'password',
        'phone',
        'bio',
        'course',
        'year',
        'tech_skills',
        'role',
        'avatar',
        'oauth_providers',
        'oauth_handoff',
        'email_verified_at',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'oauth_providers' => 'array',
            'oauth_handoff' => 'array',
        ];
    }

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function team()
    {
        return $this->hasOneThrough(
            Team::class,
            TeamMember::class,
            'user_id',
            'id',
            'id',
            'team_id'
        );
    }

    public function teamMembership()
    {
        return $this->hasOne(TeamMember::class);
    }

    public function ledTeams()
    {
        return $this->hasMany(Team::class, 'leader_id');
    }

    public function sendPasswordResetNotification($token)
    {
        $frontendUrl = env('FRONTEND_URL', 'http://localhost:3000');
        
        ResetPassword::createUrlUsing(function ($user, $token) use ($frontendUrl) {
            return $frontendUrl . '/reset-password?token=' . $token . '&email=' . urlencode($user->email);
        });
        
        $this->notify(new ResetPassword($token));
    }
}
