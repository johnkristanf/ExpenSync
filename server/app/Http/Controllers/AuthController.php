<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;


class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        $user = User::create($data);

        return response()->json([
            'user' => $user,
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        $data = $request->validated();

        $user = User::where('email', $data['email'])->first();

        if(!Hash::check($data['password'], $user->password)){
            return response()->json([
                'message' => 'Invalid Credentials',
            ], 401);
        }

        $token = $user->createToken($user->name);

        return response()->json([
            'token' => $token->plainTextToken,
            'user' => $user,
        ], 201);
    }


    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $user = Socialite::driver('google')->user();
        $this->handleSocialLogin($user, 'google');
    }

    protected function handleSocialLogin($socialUser, $provider)
    {
        $existingUser = User::where($provider . '_id', $socialUser->getId())->first();

        if ($existingUser) {
            $user = $existingUser;
        } else {
            $user = User::create([
                'name' => $socialUser->getName(),
                'email' => $socialUser->getEmail(),
                $provider . '_id' => $socialUser->getId(),
                'provider' => $provider,
            ]);
        }

        Auth::guard('web')->login($user);

        $token = $user->createToken('expensync')->plainTextToken;
        
        // ANG DAOT ANI KAY DLI MO REDIRECT POSSIBLE CORS PROBLEM
        return redirect()->to('http://localhost:5000/dashboard');
    }



    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => "Log out",], 200);
    }
}
