<?php
require __DIR__."/vendor/autoload.php";
$app = require_once __DIR__."/bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$notifications = \MongoDB\Laravel\Eloquent\Model::resolveConnection('mongodb')->table('notifications')->take(3)->get();
echo "Total Notifications: " . \MongoDB\Laravel\Eloquent\Model::resolveConnection('mongodb')->table('notifications')->count() . "\n\n";
echo json_encode($notifications, JSON_PRETTY_PRINT) . "\n";
