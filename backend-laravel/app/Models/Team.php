<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'name',
        'code',
        'leader_id',
        'max_members',
        'project_link',
        'project_submitted_at',
    ];

    protected function casts(): array
    {
        return [
            'project_submitted_at' => 'datetime',
        ];
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function leader()
    {
        return $this->belongsTo(User::class, 'leader_id');
    }

    public function teamMembers()
    {
        return $this->hasMany(TeamMember::class);
    }

    public function members()
    {
        return $this->belongsToMany(User::class, 'team_members')
            ->withPivot('role')
            ->withTimestamps();
    }

    public function joinRequests()
    {
        return $this->hasMany(TeamJoinRequest::class);
    }
}
