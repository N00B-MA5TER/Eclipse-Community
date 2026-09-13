<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\Sanctum;
use App\Models\PersonalAccessToken;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
        
        Sanctum::authenticateAccessTokensUsing(function ($accessToken, $isValid) {
            \Illuminate\Support\Facades\Log::info("Sanctum auth callback executed for token: " . $accessToken->id . ", Initial validity: " . ($isValid ? 'true' : 'false'));
            return $accessToken->tokenable !== null;
        });
    }
}
