import Header from "@/components/header";
import SideBar from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid,  XAxis, YAxis } from "recharts";
import WalletCard from "./wallet/WalletsCard";


function WalletsPage(){

    const chartData = [
        { month: "January", income: 186},
        { month: "February", income: 305 },
        { month: "March", income: 237 },
        { month: "April", income: 73 },
        { month: "May", income: 209},
        { month: "June", income: 214 },
    ]

    const chartConfig = {
        income: {
          label: "Income",
          color: "#2563eb",
        },
        expenses: {
          label: "Expenses",
          color: "#60a5fa",
        },
    } satisfies ChartConfig

    return(
        <div className="w-full h-[150vh] font-semibold bg-gray-100">
            <SideBar />

            <Header pageName="Wallets"/>

            <div className="w-full flex justify-center mt-8 gap-10 ">

                <WalletCard />
                
                <div className="flex flex-col gap-4 w-1/2 font-semibold ">
                    <div className="w-full bg-white p-4 rounded">
                        <h1 className="text-2xl text-indigo-800">City Bank</h1>
                    </div>

                    <div className="flex justify-between gap-4">
                        <Card className="w-1/2 h-full">
                            <CardHeader>
                                <CardTitle className="text-xl text-indigo-800">Total Balance</CardTitle>
                            </CardHeader>

                            <CardContent>
                                <h1 className="text-3xl text-indigo-800">$ 432568</h1>
                            </CardContent>

                            
                        </Card>

                        <Card className="w-1/2 h-full">
                            <CardHeader>
                                <CardTitle className="text-xl text-indigo-800">Monthly Expenses</CardTitle>
                            </CardHeader>

                            <CardContent>
                                <h1 className="text-3xl text-indigo-800">$ 432568</h1>
                            </CardContent>

                            
                        </Card>

                        
                    </div>

                    <Card className="p-4">
                        <CardTitle className="text-2xl text-indigo-800 mb-5">Balance Overtime</CardTitle>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                                <AreaChart accessibilityLayer data={chartData}>

                                    <CartesianGrid vertical={false}/>
                                    <YAxis
                                        dataKey="income"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={10}
                                        width={30} 
                                    />

                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />

                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <ChartLegend content={<ChartLegendContent />} />

                                    <Area
                                        dataKey="income"
                                        type="linear"
                                        stroke="var(--color-income)"
                                        strokeWidth={2}
                                        dot={false}
                                        fillOpacity={0.4}
                                    />
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>


                   
                </div>

                
            </div>
        </div>
    )
}


export default WalletsPage;