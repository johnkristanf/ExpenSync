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

    public function handleGoogleCallback(Request $request)
    {
        $user = Socialite::driver('google')->user();
        $token = $this->handleSocialLogin($user, 'google');

        if ($token) {
            return redirect()->to('http://localhost:5000/dashboard')
                ->cookie('access_token', $token, 60, '/', null, true, true); 
        }

        return redirect()->to('http://localhost:5000/signin');

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

        Auth::login($user);

        $token = $user->createToken('access_token')->plainTextToken;

        return $token;
    }


    public function fetchUserData()
    {
        $user = User::where('id', Auth::id())->first();
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ]);
    }



    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return redirect()->to('http://localhost:5000/signin')
                        ->withoutCookie('XSRF-TOKEN')
                        ->withoutCookie('access_token')
                        ->withoutCookie('laravel_session');
    }
}
