import Header from "@/components/header";
import SideBar from "@/components/sidebar";

import WalletCard from "./wallet/WalletsCard";
import BalanceExpensesCard from "./wallet/BalanceExpensesCard";
import ChartBalanceOvertime from "./wallet/ChartBalance";


function WalletsPage(){

    return(
        <div className="w-full h-[150vh] font-semibold bg-gray-100">
            <SideBar />

            <Header pageName="Wallets"/>

            <div className="w-full flex justify-center mt-8 gap-10 ">

                <WalletCard />
                
                <div className="flex flex-col gap-4 w-1/2 font-semibold ">
                    
                    <BalanceExpensesCard />

                    <ChartBalanceOvertime />
                   
                </div>

                
            </div>
        </div>
    )
}


export default WalletsPage;