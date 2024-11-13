import Header from "@/components/header";
import SideBar from "@/components/sidebar";
import BudgetsCard from "./budgets/BudgetCard";
import ChartBudgetPeriod from "./budgets/ChartBudgetPeriod";
import SpendBudgetCard from "./budgets/SpendBudgetCard";

function BudgetsPage(){

    return(
        <div className="w-full h-[150vh] font-semibold bg-gray-100">
            <SideBar />

            <Header pageName="Budgets"/>

            <div className="w-full flex justify-center mt-8 gap-10 ">

                <BudgetsCard />

                <div className="flex flex-col gap-4 w-1/2 font-semibold ">
                    <SpendBudgetCard />

                    <ChartBudgetPeriod />
                   
                </div>

                
            </div>
        </div>
    )
}


export default BudgetsPage;