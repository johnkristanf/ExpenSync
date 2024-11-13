import { Icon } from "@iconify/react";
import AddBudgetWalletModal from "./AddNewBudget";
import { useQuery } from "@tanstack/react-query";
import { getBudgets } from "@/api/get/budget";
import { GetBudgetType } from "@/types/budgets";

function BudgetsCard() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['budgets'],
        queryFn: getBudgets
    });


    const budgets: GetBudgetType[] = Array.isArray(data) ? data : [];

    if (isLoading) {
        return <h1>Loading budgets...</h1>;
    }

    if (isError) {
        return <h1>Error loading budgets!</h1>;
    }

    return (
        <div className="flex flex-col gap-4 items-center w-[25%]">
            {
                budgets.length > 0 ? (
                    budgets.map((budget) => (
                        <div key={budget.id} className="flex justify-between items-center gap-4 bg-white rounded-md p-6 w-full border border-gray-200">
                            <div className="flex gap-5">
                                <div className="bg-indigo-100 p-3 rounded-full">
                                    <Icon
                                        icon={`fa:${budget.icon}`}
                                        className="text-indigo-600 text-xl"
                                    />
                                </div>

                                <div className="flex flex-col text-indigo-800 font-semibold">
                                    <h1 className="text-xl">{budget.name}</h1>
                                    <h1 className="text-lg">$ {budget.budget}</h1>
                                </div>
                            </div>

                            <h1 className="text-gray-500">{budget.period}</h1>
                        </div>
                    ))
                ) : (
                    <h1>No budgets available</h1>
                )
            }

            <AddBudgetWalletModal />
        </div>
    );
}

export default BudgetsCard;
