<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\NotificationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('mongo_auth');

// Auth Routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [\App\Http\Controllers\AuthController::class, 'register']);
    Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);
    Route::post('/forgot-password', [\App\Http\Controllers\AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [\App\Http\Controllers\AuthController::class, 'resetPassword'])->name('password.reset');
    
    // OAuth Routes
    Route::get('/{provider}/redirect', [\App\Http\Controllers\OAuthController::class, 'redirect']);
    Route::get('/{provider}/callback', [\App\Http\Controllers\OAuthController::class, 'callback']);
    Route::post('/oauth/exchange', [\App\Http\Controllers\OAuthController::class, 'exchangeHandoff']);
    
    Route::middleware('mongo_auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
    });
});

// Event Routes
Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{id}', [EventController::class, 'show']);

use App\Http\Controllers\AdminController;
use App\Http\Controllers\StatsController;

// ...

// Public Stats Route
Route::get('/stats/public', [StatsController::class, 'publicStats']);

// Protected Routes
Route::middleware('mongo_auth')->group(function () {
    Route::get('/events/{id}/participants', [EventController::class, 'participants']);

    // Admin
    Route::prefix('admin')->group(function () {
        Route::post('/events', [AdminController::class, 'createEvent']);
        Route::delete('/events/{id}', [AdminController::class, 'deleteEvent']);
        Route::get('/users', [AdminController::class, 'users']);
        Route::post('/broadcast', [AdminController::class, 'broadcast']);
    });
    // Teams
    Route::prefix('teams')->group(function () {
        Route::get('/stream', [TeamController::class, 'stream']);
        Route::get('/', [TeamController::class, 'index']);
        Route::post('/', [TeamController::class, 'store']);
        Route::post('/join', [TeamController::class, 'join']);
        Route::post('/{id}/approve', [TeamController::class, 'approve']);
        Route::post('/{id}/reject', [TeamController::class, 'reject']);
        Route::post('/{id}/leave', [TeamController::class, 'leave']);
        Route::put('/{id}', [TeamController::class, 'update']);
        Route::delete('/{id}', [TeamController::class, 'destroy']);
        Route::post('/{id}/project', [TeamController::class, 'submitProject']);
    });

    // Registrations
    Route::prefix('registrations')->group(function () {
        Route::get('/individual', [RegistrationController::class, 'index']);
        Route::post('/individual', [RegistrationController::class, 'store']);
    });

    // Notifications
    Route::prefix('notifications')->group(function () {
        Route::get('/stream', [NotificationController::class, 'stream']);
        Route::get('/', [NotificationController::class, 'index']);
        Route::put('/mark-read', [NotificationController::class, 'markRead']);
    });

});
