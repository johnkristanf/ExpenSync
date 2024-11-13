
function SpendBudgetCard(){

    const budgetData = {
        name: "Transportation",
        spend: 3520, 
        budget: 5000
    }

    const spendPercentage = (budgetData.spend / budgetData.budget) * 100;

    return(
        <>
                    <div className="w-full bg-white p-4 rounded border border-gray-200">
                        <h1 className="text-2xl text-indigo-800">{budgetData.name}</h1>
                    </div>

                    <div className="flex flex-col bg-white border border-gray-200 rounded-md p-6 w-full">
                        <div className="flex justify-between text-gray-400">
                            <h1>Spend</h1>
                            <h1>Budget</h1>
                        </div>

                        <div className="flex justify-between text-indigo-800 text-2xl">
                            <h1>${ budgetData.spend }</h1>
                            <h1>${ budgetData.budget }</h1>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full my-3">
                            <div 
                                className="bg-indigo-600 h-3 rounded-full" 
                                style={{ width: `${Math.min(spendPercentage, 100)}%` }} 
                            />
                        </div>

                        <div className="flex justify-between text-gray-400">
                            <h1>{ Math.round(spendPercentage) }%</h1>
                            <h1>100%</h1>
                        </div>

                    </div>
        </>
    )
}

export default SpendBudgetCard;