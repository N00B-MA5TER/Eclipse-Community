<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Membership extends Model
{
    protected $fillable = [
        'user_id',
        'membership_id',
        'name',
        'email',
        'phone',
        'department',
        'student_id',
        'year_semester',
        'linkedin_url',
        'github_url',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
