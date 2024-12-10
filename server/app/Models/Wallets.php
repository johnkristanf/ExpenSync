<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wallets extends Model
{
    /** @use HasFactory<\Database\Factories\WalletsFactory> */
    use HasFactory;

    protected $fillable = [
        "name",
        "icon",
        "amount",
        "user_id"
    ];
}
