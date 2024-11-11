import { useQuery } from "@tanstack/react-query";
import AddNewWalletModal from "./AddNewWalletModal";
import { getWallets } from "@/api/get/wallets";
import { Wallet } from "@/types/wallets";
import { Icon } from "@iconify/react";

function WalletCard(){

    const { data } = useQuery({
        queryKey: ['wallets'],
        queryFn: getWallets
    })

    const wallets: Wallet[] = data || [];

    console.log("wallets: ", wallets);
    
    
    return(
            <div className="flex flex-col gap-4 items-center w-[20%]">

                {/* AFTER THE USER CLICK THE DIV STORE THE WALLET DATA IN ZUSTAND STATE */}

                {
                    wallets.map((wallet) => (
                        <div 
                            key={wallet.id}
                            className="flex gap-4 bg-white rounded-md p-6 w-full hover:cursor-pointer"
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

                

                <AddNewWalletModal />

                </div>
    )
}

export default WalletCard;