import { Wallet } from '@/types/wallets';
import { create } from 'zustand';

type WalletStore = {
    wallet: Wallet;
    addWallet: (wallet: Wallet) => void;
}

const InitialState: Wallet = {
    id: 0,
    name: 'N/A',
    amount: 0,
    icon: 'wallet',
    user_id: 0,
    created_at: new Date(),
}

export const useWalletStore = create<WalletStore>((set) => ({
    wallet: InitialState,
    addWallet: (wallet) => set({ wallet }),
}))
