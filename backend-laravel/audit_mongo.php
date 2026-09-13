<?php

use Illuminate\Support\Facades\DB;

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

try {
    $database = DB::connection('mongodb')->getMongoDB();
    
    $targets = ['auth_users', 'users', 'events', 'teams', 'registrations', 'notifications'];
    
    $audit = [];
    
    foreach ($targets as $target) {
        $collection = $database->selectCollection($target);
        $sample = $collection->findOne();
        
        $audit[$target] = $sample;
    }
    
    echo json_encode($audit, JSON_PRETTY_PRINT);
    
} catch (\Exception $e) {
    echo "Error:\n";
    echo $e->getMessage() . "\n";
}
