import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useWalletStore from "@/store/store";

function BalanceExpensesCard(){

    const wallet = useWalletStore((state) => state.wallet);

    return(
        <>
            <div className="w-full bg-white p-4 rounded">
                <h1 className="text-2xl text-indigo-800">{ wallet.name }</h1>
            </div>

            <div className="flex justify-between gap-4">
                        <Card className="w-1/2 h-full">
                            <CardHeader>
                                <CardTitle className="text-xl text-indigo-800">Total Balance</CardTitle>
                            </CardHeader>

                            <CardContent>
                                <h1 className="text-3xl text-indigo-800">$ { wallet.amount }</h1>
                            </CardContent>

                            
                        </Card>


                        {/* THE VALUE OF EXPENSES IS THE TOTAL SPEND THIS FOR THIS SPECIFIC CARD */}

                        <Card className="w-1/2 h-full">
                            <CardHeader>
                                <CardTitle className="text-xl text-indigo-800">Monthly Expenses</CardTitle>
                            </CardHeader>

                            <CardContent>
                                <h1 className="text-3xl text-indigo-800">$ 432568</h1>
                            </CardContent>

                            
                        </Card>

                        
            </div>
                    
        </>
                
    )
}

export default BalanceExpensesCard;