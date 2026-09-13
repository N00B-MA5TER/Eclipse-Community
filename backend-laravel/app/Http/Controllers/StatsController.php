<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Team;

class StatsController extends Controller
{
    public function publicStats(Request $request)
    {
        $builders = User::count();
        $teams = Team::count();
        $projects = Team::whereNotNull('projectLink')->count();

        return response()->json([
            'builders' => $builders,
            'teams' => $teams,
            'projects' => $projects,
            'corePillars' => 5,
            'openSource' => 100
        ], 200);
    }
}
