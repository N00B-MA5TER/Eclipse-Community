<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\EmailOtp;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Mail\VerifyEmailOtp;

class AuthController extends Controller
{
    private function generateAndSendOtp($user)
    {
        // Invalidate old OTPs
        EmailOtp::where('user_id', $user->id)->delete();

        // Generate 6-digit OTP
        $otp = sprintf('%06d', mt_rand(100000, 999999));

        EmailOtp::create([
            'user_id' => $user->id,
            'email' => $user->email,
            'otp' => Hash::make($otp),
            'expires_at' => now()->addMinutes(10)
        ]);

        Mail::to($user->email)->send(new VerifyEmailOtp($otp));
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        // Check if user exists
        $user = User::where('email', $request->email)->first();

        if ($user) {
            // If user exists and verified, throw error
            if ($user->email_verified_at) {
                return response()->json(['error' => 'Email already registered.'], 400);
            }
            // If user exists but not verified, update password and resend OTP
            $user->password = Hash::make($request->password);
            $user->name = $request->name;
            $user->save();
        } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'participant', // default role
            ]);
        }

        $this->generateAndSendOtp($user);

        return response()->json([
            'message' => 'Registration initiated. Please verify your email.',
            'requires_otp' => true,
            'email' => $user->email
        ], 200);
    }

    public function verifyOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'otp' => 'required|string|size:6'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found.'], 404);
        }

        $otpRecord = EmailOtp::where('user_id', $user->id)
            ->whereNull('verified_at')
            ->orderBy('created_at', 'desc')
            ->first();

        if (!$otpRecord || !Hash::check($request->otp, $otpRecord->otp)) {
            return response()->json(['error' => 'Invalid OTP.'], 400);
        }

        if (now()->greaterThan($otpRecord->expires_at)) {
            return response()->json(['error' => 'OTP has expired.'], 400);
        }

        // Verify user and OTP
        $otpRecord->verified_at = now();
        $otpRecord->save();

        $user->email_verified_at = now();
        $user->save();

        // Create token
        $user->tokens()->delete();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Email verified successfully',
            'token' => $token,
            'user' => $user
        ], 200);
    }

    public function resendOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found.'], 404);
        }

        if ($user->email_verified_at) {
            return response()->json(['error' => 'Email already verified.'], 400);
        }

        // Rate limit: check if last OTP was sent within 1 minute
        $lastOtp = EmailOtp::where('user_id', $user->id)->orderBy('created_at', 'desc')->first();
        if ($lastOtp && now()->diffInSeconds($lastOtp->created_at) < 60) {
            return response()->json(['error' => 'Please wait 60 seconds before requesting a new OTP.'], 429);
        }

        $this->generateAndSendOtp($user);

        return response()->json([
            'message' => 'OTP resent successfully.'
        ], 200);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        if (is_null($user->email_verified_at)) {
            $this->generateAndSendOtp($user);
            return response()->json([
                'error' => 'Email not verified.', 
                'requires_otp' => true,
                'email' => $user->email
            ], 403);
        }

        $user->tokens()->delete();
        
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out'
        ], 200);
    }

    public function me(Request $request)
    {
        $user = $request->user();
        $user->uid = $user->uid ?? (string) $user->id;
        $user->techSkills = $user->tech_skills;

        return response()->json($user, 200);
    }

    public function updateProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'phone' => 'nullable|string|max:50',
            'bio' => 'nullable|string',
            'course' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:50',
            'techSkills' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        $user = $request->user();
        $user->fill($validator->safe()->only(['name', 'phone', 'bio', 'course', 'year']));
        if ($request->has('techSkills')) {
            $user->tech_skills = $request->techSkills;
        }
        $user->save();

        $user->uid = $user->uid ?? (string) $user->id;
        $user->techSkills = $user->tech_skills;

        return response()->json($user, 200);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        
        $status = \Illuminate\Support\Facades\Password::broker()->sendResetLink(
            $request->only('email')
        );

        return $status === \Illuminate\Support\Facades\Password::RESET_LINK_SENT
            ? response()->json(['message' => __($status)])
            : response()->json(['error' => __($status)], 400);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6|confirmed',
        ]);

        $status = \Illuminate\Support\Facades\Password::broker()->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(\Illuminate\Support\Str::random(60));
                $user->save();
            }
        );

        return $status === \Illuminate\Support\Facades\Password::PASSWORD_RESET
            ? response()->json(['message' => __($status)])
            : response()->json(['error' => __($status)], 400);
    }
}
