<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\PersonalAccessToken;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class MongoSanctumMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        if (strpos($token, '|') !== false) {
            [$id, $tokenValue] = explode('|', $token, 2);
            $hashedToken = hash('sha256', $tokenValue);
            $accessToken = PersonalAccessToken::find($id);

            if ($accessToken && hash_equals($accessToken->token, $hashedToken)) {
                $user = $accessToken->tokenable;
                if ($user) {
                    $user->withAccessToken($accessToken);
                    Auth::login($user);
                    // Update last used at
                    $accessToken->forceFill(['last_used_at' => now()])->save();
                    return $next($request);
                }
            }
        } else {
            $hashedToken = hash('sha256', $token);
            $accessToken = PersonalAccessToken::where('token', $hashedToken)->first();
            if ($accessToken) {
                $user = $accessToken->tokenable;
                if ($user) {
                    $user->withAccessToken($accessToken);
                    Auth::login($user);
                    $accessToken->forceFill(['last_used_at' => now()])->save();
                    return $next($request);
                }
            }
        }

        return response()->json(['message' => 'Unauthenticated.'], 401);
    }
}
