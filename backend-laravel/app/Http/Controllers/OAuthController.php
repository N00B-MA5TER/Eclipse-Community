<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class OAuthController extends Controller
{
    protected $allowedProviders = ['google', 'github'];

    public function redirect(Request $request, $provider)
    {
        if (!in_array($provider, $this->allowedProviders)) {
            return response()->json(['message' => 'Invalid provider'], 400);
        }

        $intendedFlow = $request->query('intended') === 'admin' ? 'admin' : 'user';
        $state = Str::random(40);
        Cache::put("oauth_state_{$state}", $intendedFlow, now()->addMinutes(10));

        return Socialite::driver($provider)->stateless()->with(['state' => $state])->redirect();
    }

    public function callback(Request $request, $provider)
    {
        if (!in_array($provider, $this->allowedProviders)) {
            return response()->json(['message' => 'Invalid provider'], 400);
        }

        $state = $request->query('state');
        if (!$state) {
            return redirect(env('FRONTEND_URL', 'http://localhost:3000') . '/login?error=invalid_state');
        }

        $intendedFlow = Cache::pull("oauth_state_{$state}");
        if (!$intendedFlow) {
            return redirect(env('FRONTEND_URL', 'http://localhost:3000') . '/login?error=invalid_state');
        }

        try {
            $socialUser = Socialite::driver($provider)->stateless()->user();
        } catch (\Exception $e) {
            Log::error("OAuth Callback Error: " . $e->getMessage());
            return redirect(env('FRONTEND_URL', 'http://localhost:3000') . '/auth/callback?error=auth_failed');
        }

        // Verify email is present
        $email = $socialUser->getEmail();
        if (!$email) {
            return redirect(env('FRONTEND_URL', 'http://localhost:3000') . '/auth/callback?error=no_email');
        }

        // Verify email is verified by provider for admin flow
        if ($intendedFlow === 'admin' && !($socialUser->user['email_verified'] ?? false)) {
            return redirect(env('FRONTEND_URL', 'http://localhost:3000') . '/admin/login?error=unverified_google_email');
        }

        // For normal users, also strictly require verification if it's google
        if ($provider === 'google' && !($socialUser->user['email_verified'] ?? false)) {
            return redirect(env('FRONTEND_URL', 'http://localhost:3000') . '/auth/callback?error=email_not_verified');
        }

        $user = User::where('email', $email)->first();

        // Admin flow strict authorization check before creating or linking user
        if ($intendedFlow === 'admin') {
            if (!$user || $user->role !== 'admin') {
                return redirect(env('FRONTEND_URL', 'http://localhost:3000') . '/admin/login?error=unauthorized_admin');
            }
        }

        $providerData = [
            'provider' => $provider,
            'provider_id' => $socialUser->getId(),
            'email' => $email,
            'createdAt' => now()->toIso8601String()
        ];

        if ($user) {
            // Existing user - Link identity if not already linked
            $providers = $user->oauth_providers ?? [];
            $alreadyLinked = false;
            foreach ($providers as $p) {
                if ($p['provider'] === $provider && $p['provider_id'] === $socialUser->getId()) {
                    $alreadyLinked = true;
                    break;
                }
            }

            if (!$alreadyLinked) {
                $providers[] = $providerData;
                $user->oauth_providers = $providers;
                $user->save();
            }

            if (!$user->avatar && $socialUser->getAvatar()) {
                $user->update(['avatar' => $socialUser->getAvatar()]);
            }
        } else {
            // New user
            $user = new User();
            $user->uid = Str::random(28); // Match Firebase UID format length
            $user->email = $email;
            $user->name = $socialUser->getName() ?? $socialUser->getNickname() ?? 'User';
            $user->avatar = $socialUser->getAvatar();
            $user->email_verified_at = now();
            $user->oauth_providers = [$providerData];
            $user->save();
        }

        // Generate one-time handoff code
        $handoffCode = Str::random(64);
        $hashedCode = hash('sha256', $handoffCode);

        // Store hash and expiry (60 seconds) and intended flow
        $user->update([
            'oauth_handoff' => [
                'hash' => $hashedCode,
                'expires_at' => now()->addSeconds(60)->toIso8601String(),
                'intended' => $intendedFlow
            ]
        ]);

        // Redirect to frontend with the UNHASHED code
        $frontendUrl = env('FRONTEND_URL', 'http://localhost:3000');
        return redirect()->away($frontendUrl . '/auth/callback?code=' . $handoffCode);
    }

    public function exchangeHandoff(Request $request)
    {
        $request->validate([
            'code' => 'required|string'
        ]);

        $hashedCode = hash('sha256', $request->code);

        // Find user with this handoff hash
        $user = User::whereJsonContains('oauth_handoff->hash', $hashedCode)->first();

        if (!$user) {
            return response()->json(['message' => 'Invalid or expired code'], 401);
        }

        // Check expiration
        $expiresAt = \Carbon\Carbon::parse($user->oauth_handoff['expires_at']);
        if (now()->isAfter($expiresAt)) {
            $user->update(['oauth_handoff' => null]);
            return response()->json(['message' => 'Invalid or expired code'], 401);
        }

        $intended = $user->oauth_handoff['intended'] ?? 'user';

        // Unset the handoff code so it cannot be reused
        $user->update(['oauth_handoff' => null]);

        // Create Sanctum Token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user,
            'intended' => $intended
        ]);
    }
}
