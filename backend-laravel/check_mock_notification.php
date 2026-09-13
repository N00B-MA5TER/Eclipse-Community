<?php
require __DIR__."/vendor/autoload.php";
$app = require_once __DIR__."/bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$notif = \MongoDB\Laravel\Eloquent\Model::resolveConnection('mongodb')->table('notifications')
            ->where('title', 'mongo db test notification')->first();
echo json_encode($notif, JSON_PRETTY_PRINT) . "\n";
