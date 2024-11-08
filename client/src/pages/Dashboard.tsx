import SideBar from "@/components/sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { faArrowTrendDown, faArrowTrendUp, faChevronRight, faMagnifyingGlass, faSun, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bar, BarChart, XAxis } from "recharts";

function DashboardPage(){
    return(
        <>
            <div className="w-full h-[150vh] font-semibold">
                <SideBar />

                <Header />
                <Cards />

                <ExpensesCharts />

            </div>    
        </>
    )   
}


function Header(){
    return(
        <div className="flex flex-col gap-8 mt-8">

            <div className="w-full flex justify-around gap-32">

                <div className="relative w-[30%]">
                    <input 
                        type="search" 
                        className="border border-gray-300 focus:outline-none rounded-md p-3 w-full"
                        placeholder="Search Here"
                    />

                    { 
                        <FontAwesomeIcon 
                            icon={faMagnifyingGlass} 
                            className="absolute top-0 right-0 bg-indigo-600 p-4 rounded-md text-white"
                        /> 
                    }
                </div>
                

                <div className="flex items-center gap-5 ">
                    { <FontAwesomeIcon icon={faSun} className="text-2xl hover:cursor-pointer"/> }
                    { <FontAwesomeIcon icon={faUser} className="bg-indigo-600 p-3 rounded-full text-white hover:cursor-pointer"/> }

                </div>


            </div>

            <div className="w-full flex justify-around gap-32">
                <div className="flex-col">
                    <h1 className="text-4xl text-indigo-600">Dashboard</h1>
                    <h1 className="opacity-60">Welcome ExpenSync financial managemament</h1>
                </div>

                <h1 className="opacity-60 flex gap-4 items-center">
                    Home 
                    {<FontAwesomeIcon icon={faChevronRight}/>} 
                    Dashboard
                </h1>
            </div>
        </div>    
        
    )
}


function Cards(){
    return(
        <div className="flex justify-center gap-7 mt-12 pl-[8rem]">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl text-indigo-600">Total Balance</CardTitle>
                </CardHeader>

                <CardContent>
                    <h1 className="text-3xl text-indigo-600">$ 432568</h1>
                </CardContent>

                <CardFooter>
                    <div className="flex flex-col text-gray-500">
                        <div className="border border-gray-600 w-full h-25 mb-3"></div>
                        <h1> 
                            <span className="text-green-700">{<FontAwesomeIcon icon={faArrowTrendUp}/>} 2.47%</span> 
                            Last month $24,478
                        </h1>
                    </div>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl text-indigo-600">Total Expenses</CardTitle>
                </CardHeader>

                <CardContent>
                    <h1 className="text-3xl text-indigo-600">$ 432568</h1>
                </CardContent>

                <CardFooter>
                    <div className="flex flex-col text-gray-500">
                        <div className="border border-gray-600 w-full h-25 mb-3"></div>
                        <h1> 
                            <span className="text-red-700">{<FontAwesomeIcon icon={faArrowTrendDown}/>} 2.47%</span> 
                            Last month $24,478
                        </h1>
                    </div>
                </CardFooter>
            </Card>


            <Card>
                <CardHeader>
                    <CardTitle className="text-xl text-indigo-600">Total Savings</CardTitle>
                </CardHeader>

                <CardContent>
                    <h1 className="text-3xl text-indigo-600">$ 432568</h1>
                </CardContent>

                <CardFooter>
                    <div className="flex flex-col text-gray-500">
                        <div className="border border-gray-600 w-full h-25 mb-3"></div>
                        <h1> 
                            <span className="text-red-700">{<FontAwesomeIcon icon={faArrowTrendDown}/>} 2.47%</span> 
                            Last month $24,478
                        </h1>
                    </div>
                </CardFooter>
            </Card>


            <Card>
                <CardHeader>
                    <CardTitle className="text-xl text-indigo-600">Total Investments</CardTitle>
                </CardHeader>

                <CardContent>
                    <h1 className="text-3xl text-indigo-600">$ 432568</h1>
                </CardContent>

                <CardFooter>
                    <div className="flex flex-col text-gray-500">
                        <div className="border border-gray-600 w-full h-25 mb-3"></div>
                        <h1> 
                            <span className="text-red-700">{<FontAwesomeIcon icon={faArrowTrendDown}/>} 2.47%</span> 
                            Last month $24,478
                        </h1>
                    </div>
                </CardFooter>
            </Card>
        </div>
        
    )
}


function ExpensesCharts(){

    const chartData = [
        { month: "January", income: 186, expenses: 80 },
        { month: "February", income: 305, expenses: 200 },
        { month: "March", income: 237, expenses: 120 },
        { month: "April", income: 73, expenses: 190 },
        { month: "May", income: 209, expenses: 130 },
        { month: "June", income: 214, expenses: 140 },
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


    const categories = [
        { name: "Food", value: 60, color: "bg-green-500" },
        { name: "Transportation", value: 40, color: "bg-yellow-500" },
        { name: "Entertainment", value: 75, color: "bg-red-500" },
        { name: "Utilities", value: 50, color: "bg-blue-500" },
    ];

    const totalValue = categories.reduce((total, category) => total + category.value, 0);


    return (
        <div className="flex justify-end mt-12 gap-24 pr-12">

            <Card className="p-8">
                <CardTitle className="text-2xl">Monthly Income vs Expenses</CardTitle>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                        <BarChart accessibilityLayer data={chartData}>
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />

                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />

                            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card className="p-8">
                <CardTitle className="text-2xl">Monthly Expenses Breakdown</CardTitle>
                <CardDescription>
                    <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-4 mt-2 flex overflow-hidden">
                            {categories.map((category) => (
                                <div
                                    key={category.name}
                                    className={`${category.color} h-full`}
                                    style={{ width: `${category.value}%` }}
                                    title={`${category.name}: ${category.value}%`}
                                />
                            ))}
                        </div>
                    </div>
                </CardDescription>

                <CardContent className="mt-8 flex flex-col gap-8">
                    {
                        categories.map((category) => (
                            
                            <div className="flex justify-between">
                                <div className="flex gap-3">
                                    <div className={`p-3 rounded-full ${category.color}`}></div>
                                    <h1>{ category.name }</h1>
                                </div>

                                <div className="flex gap-3">
                                    <div>₱{ category.value }</div>
                                    <h1>{ ((category.value / totalValue) * 100).toFixed(1) }%</h1>
                                </div>
                            </div>
                        ))
                    }
                </CardContent>
            </Card>
            
        </div>
    )
}

export default DashboardPage;