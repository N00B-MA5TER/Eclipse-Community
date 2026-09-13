<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$tokenModel = App\Models\PersonalAccessToken::first();

// Request
$req = \Illuminate\Http\Request::create('/api/auth/me', 'GET');
$req->headers->set('Authorization', 'Bearer ' . $tokenModel->token);
$app->instance('request', $req);

$user = auth()->guard('sanctum')->user();
if ($user) {
    dump(get_class($user));
    dump(method_exists($user, 'currentAccessToken'));
    $user->currentAccessToken(); // Try calling it
    echo "Success calling currentAccessToken!\n";
} else {
    dump("User is null");
}
