<?php
require __DIR__."/vendor/autoload.php";
$app = require_once __DIR__."/bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

echo App\Models\Team::where('memberIds', 'like', '%8eGMJoTEVlMLD2E1veLPYfFop6I3%')->count();
echo " and normal: ";
echo App\Models\Team::where('memberIds', '8eGMJoTEVlMLD2E1veLPYfFop6I3')->count();
