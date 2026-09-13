<?php
require __DIR__."/vendor/autoload.php";
$app = require_once __DIR__."/bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Team;

$teams = Team::all();
$seen = [];
$duplicates = [];

foreach ($teams as $team) {
    // Check duplicates by eventId + user ID (which can be leader's uid or just member checking)
    // The user says "eventId + leaderId must be unique". Let's check this.
    $leaderId = $team->leader['uid'] ?? null;
    if (!$leaderId) continue;
    
    $key = $team->eventId . '_' . $leaderId;
    if (isset($seen[$key])) {
        $duplicates[] = [
            'team1' => $seen[$key],
            'team2' => $team->id,
            'eventId' => $team->eventId,
            'leaderId' => $leaderId
        ];
    } else {
        $seen[$key] = $team->id;
    }
}

echo "Duplicate eventId + leaderId combinations found: " . count($duplicates) . "\n";
if (count($duplicates) > 0) {
    print_r($duplicates);
}
