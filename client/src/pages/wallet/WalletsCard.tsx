import { useQuery } from "@tanstack/react-query";
import AddNewWalletModal from "./AddNewWalletModal";
import { getWallets } from "@/api/get/wallets";
import { Wallet } from "@/types/wallets";
import { Icon } from "@iconify/react";
import { useWalletStore } from "@/store/walletStore";
import { useEffect, useMemo } from "react";

function WalletCard(){

    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ['wallets'],
        queryFn: getWallets
    });

    const setWallet = useWalletStore((state) => state.addWallet);
    const wallets: Wallet[] = useMemo(() => data || [], [data]);


    const initialWallet = useMemo(() => wallets[0], [wallets]);

    useEffect(() => {
        if(initialWallet) setWallet(initialWallet);
    }, [initialWallet, setWallet]);


    const handleUpdateWallet = (
        id: number,
        name: string,
        amount: number,
        icon: string,
        user_id: number,
        created_at: Date
    ) => {

        const updatedWallet: Wallet = {
            id,
            name,
            amount,
            icon,
            user_id,
            created_at
        };
      
        setWallet(updatedWallet);
    }
    
    
    return(
            <div className="flex flex-col gap-4 items-center w-[20%]">

                {/* AFTER THE USER CLICK THE DIV STORE THE WALLET DATA IN ZUSTAND STATE */}

                {
                    isLoading && (
                        <h1 className="text-indigo-800 text-lg">
                            Loading Wallets....
                        </h1>
                    )
                }

                {
                    wallets.map((wallet) => (
                        <div 
                            key={wallet.id}
                            className="flex gap-4 bg-white rounded-md p-6 w-full hover:cursor-pointer"
                            onClick={() => handleUpdateWallet(
                                wallet.id,
                                wallet.name,
                                wallet.amount,
                                wallet.icon,
                                wallet.user_id,
                                wallet.created_at
                            )}
                        >
                            <div className="bg-indigo-100 p-3 rounded-full">
                                <Icon 
                                    icon={`fa:${wallet.icon}`} 
                                    width={20} 
                                    height={20} 
                                    className="text-indigo-600 text-xl"
                                />
                            </div>

                                <div className="flex flex-col text-indigo-800 font-semibold">
                                    <h1 className="text-xl">{ wallet.name }</h1>
                                    <h1 className="text-lg">$ { wallet.amount }</h1>
                                </div>
                        </div>
                    ))
                }

                {
                    isSuccess && ( <AddNewWalletModal />)
                }

            </div>
    )
}

export default WalletCard;