import Header from "@/components/header";
import SideBar from "@/components/sidebar";
import { Card, CardContent,  CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { faBank, faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Area, AreaChart, CartesianGrid,  XAxis, YAxis } from "recharts";

function BudgetsPage(){

    const chartData = [
        { month: "January", budget: 186},
        { month: "February", budget: 305 },
        { month: "March", budget: 237 },
        { month: "April", budget: 73 },
        { month: "May", budget: 209},
        { month: "June", budget: 214 },
    ]

    const chartConfig = {
        budget: {
          label: "Budget",
          color: "#2563eb",
        },
       
    } satisfies ChartConfig


    const budgetData = {
        name: "Transportation",
        spend: 3520, 
        budget: 5000
    }

    const spendPercentage = (budgetData.spend / budgetData.budget) * 100;

    console.log("spendPercentage:", spendPercentage);
    

    return(
        <div className="w-full h-[150vh] font-semibold bg-gray-100">
            <SideBar />

            <Header pageName="Budgets"/>

            <div className="w-full flex justify-center mt-8 gap-10 ">

                <div className="flex flex-col gap-4 items-center w-[25%]">

                    <div className="flex justify-between items-center gap-4 bg-white rounded-md p-6 w-full border border-gray-200">
                        <div className="flex gap-5">
                            <div className="bg-indigo-100 p-3 rounded-full">
                                <FontAwesomeIcon 
                                    icon={faBank}
                                    className="text-indigo-600 text-xl"
                                />
                            </div>

                            <div className="flex flex-col text-indigo-800 font-semibold">
                                <h1 className="text-xl">City Bank</h1>
                                <h1 className="text-lg">$ 432568</h1>
                            </div>
                        </div>
                        

                        <h1 className="text-gray-500">Week</h1>

                    </div>


                    <div className="flex justify-between items-center gap-4 bg-white rounded-md p-6 w-full border border-gray-200">
                        <div className="flex gap-5">
                            <div className="bg-indigo-100 p-3 rounded-full">
                                <FontAwesomeIcon 
                                    icon={faCar}
                                    className="text-indigo-600 text-xl"
                                />
                            </div>

                            <div className="flex flex-col text-indigo-800 font-semibold">
                                <h1 className="text-xl">Transportation</h1>
                                <h1 className="text-lg">$ 432568</h1>
                            </div>
                        </div>
                        

                        <h1 className="text-gray-500">Week</h1>

                    </div>

                    {/* <AddFormModal type="budget" url="/sample-endpoint"/> */}

                    

                </div>

                <div className="flex flex-col gap-4 w-1/2 font-semibold ">
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

                    <Card className="p-4 border border-gray-200">
                        <CardTitle className="text-2xl text-indigo-800 mb-5">Budget Period</CardTitle>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                                <AreaChart accessibilityLayer data={chartData}>

                                    <CartesianGrid vertical={false}/>
                                    <YAxis
                                        dataKey="budget"
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
                                        dataKey="budget"
                                        type="linear"
                                        stroke="var(--color-budget)"
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


export default BudgetsPage;