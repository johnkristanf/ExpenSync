<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        $user = User::create($data);
        $token = $user->createToken($data['name']);

        return response()->json([
            'token' => $token->plainTextToken,
            'user' => $user,
        ], 201);
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => ['required','exists:users'],
            'password' => ['required'],
        ]);

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


    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => "Log out",], 200);
    }
}