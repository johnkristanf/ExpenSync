
export const getWallets = async () => {
    const response = await fetch('http://localhost:3000/dev/wallet/get', {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get wallets');
    }

    return response.json();
}