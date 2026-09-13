<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamJoinRequest extends Model
{
    protected $fillable = [
        'team_id',
        'user_id',
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
