<?php
require __DIR__."/vendor/autoload.php";
$app = require_once __DIR__."/bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

$nulls = DB::table('teams')->whereNull('leader.uid')->get();
echo "Teams with null leader.uid: " . count($nulls) . "\n";
foreach ($nulls as $n) echo json_encode($n) . "\n";
