<?php

namespace App\Http\Controllers;

use App\Http\Requests\WalletsStoreRequest;
use App\Http\Requests\WalletsUpdateRequest;
use App\Models\Wallets;
use Illuminate\Http\Client\Request;

class WalletsController extends Controller
{
    
    public function index()
    {
        return Wallets::all();
    }

    public function store(WalletsStoreRequest $request)
    {
        $data = $request->validated();
        return response()->json(Wallets::create($data), 201);
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
