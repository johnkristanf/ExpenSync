<?php

namespace App\Http\Controllers;

use App\Http\Requests\WalletsStoreRequest;
use App\Http\Requests\WalletsUpdateRequest;
use App\Models\Wallets;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WalletsController extends Controller 
{
    
    public function index()
    {
        $wallets = Wallets::where('user_id', Auth::id())->get();
        
        return response()->json([
            'wallets' => $wallets
        ], 200);
    }

    public function store(WalletsStoreRequest $request)
    {
        $data = $request->validated();

        $newWallet = $request->user()->wallets()->create([
            'name' => $data['name'],
            'icon' => $data['icon'],
            'amount' => $data['amount'],
            'user_id' => Auth::id(),
        ]);

        return response()->json($newWallet, 201);
    }

    
    
    public function update(WalletsUpdateRequest $request, string $wallet_id)
    {
        $data = $request->validated();

        $wallet = Wallets::findOrFail($wallet_id);

        $updated = $wallet->update([
            'name' => $data['name'],
            'icon' => $data['icon'],
            'amount' => $wallet->amount + $data['amount']
        ]);

        if (!$updated) {
            return response()->json(['message' => 'Error Occured in updating wallet'], 500);
        }

        return response()->json(['message' => 'Wallet updated successfully'], 200);

                       
    }

   
    public function destroy(string $wallet_id)
    {
        Wallets::findOrFail($wallet_id)->delete();
        return response()->json(['message' => 'Wallet deleted successfully'], 200);
    }
}
