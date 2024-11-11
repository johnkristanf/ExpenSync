import { AddWalletType } from "@/types/wallets";

export const addNewWallet = async (walletData: AddWalletType): Promise<Response> => {
    const response = await fetch('http://localhost:3000/dev/wallet/add', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(walletData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add wallet');
    }

    return response.json();
};
