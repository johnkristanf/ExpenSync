
export type AddWalletType = {
    icon: string;
    name: string;
    amount: number
}

export type Wallet = {
    id: number;
    name: string;
    amount: number;
    icon: string;
    user_id: number;
    created_at: Date;
}