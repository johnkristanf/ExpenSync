<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\WalletsController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource("wallets", WalletsController::class);

    Route::get('/user', [AuthController::class, 'fetchUserData']);
    Route::post('/logout', [AuthController::class, 'logout']);

});