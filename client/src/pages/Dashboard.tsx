import SideBar from "@/components/sidebar";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";

import { 
    ChartConfig, 
    ChartContainer, 
    ChartLegend, 
    ChartLegendContent, 
    ChartTooltip, 
    ChartTooltipContent
} from "@/components/ui/chart";

import { 
    faArrowTrendDown, 
    faArrowTrendUp, 
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bar, BarChart, XAxis } from "recharts";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Header from "@/components/header";
  

function DashboardPage(){
    return(
        <div className="w-full h-[230vh] font-semibold bg-gray-100">
            <SideBar />

            <Header pageName="Dashboard"/>

            <Cards />

            <ExpensesCharts />

            <div className="flex justify-end gap-8 mt-12">
                <SavingGoals />
                <TransactionHistory />
            </div>



        </div>    
    )   
}




function Cards(){
    return(
        <div className="flex justify-center gap-7 mt-12 pl-[8rem]">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl text-indigo-800">Total Balance</CardTitle>
                </CardHeader>

                <CardContent>
                    <h1 className="text-3xl text-indigo-800">$ 432568</h1>
                </CardContent>

                <CardFooter>
                    <div className="flex flex-col text-gray-500">
                        <div className="border border-gray-800 w-full h-25 mb-3"></div>
                        <h1> 
                            <span className="text-green-700">{<FontAwesomeIcon icon={faArrowTrendUp}/>} 2.47%</span> 
                            Last month $24,478
                        </h1>
                    </div>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl text-indigo-800">Total Expenses</CardTitle>
                </CardHeader>

                <CardContent>
                    <h1 className="text-3xl text-indigo-800">$ 432568</h1>
                </CardContent>

                <CardFooter>
                    <div className="flex flex-col text-gray-500">
                        <div className="border border-gray-800 w-full h-25 mb-3"></div>
                        <h1> 
                            <span className="text-red-700">{<FontAwesomeIcon icon={faArrowTrendDown}/>} 2.47%</span> 
                            Last month $24,478
                        </h1>
                    </div>
                </CardFooter>
            </Card>


            <Card>
                <CardHeader>
                    <CardTitle className="text-xl text-indigo-800">Total Savings</CardTitle>
                </CardHeader>

                <CardContent>
                    <h1 className="text-3xl text-indigo-800">$ 432568</h1>
                </CardContent>

                <CardFooter>
                    <div className="flex flex-col text-gray-500">
                        <div className="border border-gray-800 w-full h-25 mb-3"></div>
                        <h1> 
                            <span className="text-red-700">{<FontAwesomeIcon icon={faArrowTrendDown}/>} 2.47%</span> 
                            Last month $24,478
                        </h1>
                    </div>
                </CardFooter>
            </Card>


            <Card>
                <CardHeader>
                    <CardTitle className="text-xl text-indigo-800">Total Investments</CardTitle>
                </CardHeader>

                <CardContent>
                    <h1 className="text-3xl text-indigo-800">$ 432568</h1>
                </CardContent>

                <CardFooter>
                    <div className="flex flex-col text-gray-500">
                        <div className="border border-gray-800 w-full h-25 mb-3"></div>
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
                <CardTitle className="text-2xl text-indigo-800">Monthly Income vs Expenses</CardTitle>
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
                <CardTitle className="text-2xl text-indigo-800">Monthly Expenses Breakdown</CardTitle>
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
                            
                            <div 
                                key={category.name} 
                                className="flex justify-between"
                            >
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


function TransactionHistory(){
    return(
        <Table className="w-[94%] bg-white p-8 rounded-md">
            <TableHeader>
                <h1 className="w-52 text-xl text-indigo-800 p-3">Transaction History</h1>
                <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
            </TableBody>
        </Table>

    )
}




function CircularProgressBar({ currentValue, goal }: { currentValue: number, goal: number }) {
    const radius = 50; 
    const strokeWidth = 10; 
    const circumference = 2 * Math.PI * radius;

    const percentage = (currentValue / goal) * 100;
    
    // Handle when the progress bar is full (100%)
    const strokeDasharray = Math.round((percentage / 100) * circumference); // Rounded to nearest whole number
    const strokeDashoffset = Math.round(circumference - strokeDasharray);  

    return (
        <div className="relative flex justify-center items-center">
            <svg width={2 * (radius + strokeWidth)} height={2 * (radius + strokeWidth)}>
                {/* Background Circle */}
                <circle
                    cx={radius + strokeWidth}
                    cy={radius + strokeWidth}
                    r={radius}
                    fill="transparent"
                    stroke="#e5e7eb" 
                    strokeWidth={strokeWidth}
                />

                {/* Progress Circle */}
                <circle
                    cx={radius + strokeWidth}
                    cy={radius + strokeWidth}
                    r={radius}
                    fill="transparent"
                    stroke="#4c51bf"
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    transform={`rotate(-90 ${radius + strokeWidth} ${radius + strokeWidth})`} // Rotate to start from top
                />
            </svg>

            <span className="absolute text-xl font-semibold text-indigo-600">
                {Math.round(percentage)}%
            </span>
        </div>
    );
}

function SavingGoals() {
    const savings = [
        { name: "Car", value: 8000, goal: 8000 },
        { name: "House", value: 4000, goal: 8000 },
        { name: "Laptop", value: 800, goal: 8000 },
        { name: "Computer", value: 6500, goal: 8000 },
    ];

    return (
        <Card className="ml-48 p-8 w-1/2">
            <CardTitle className="text-2xl text-indigo-800">Savings Goals</CardTitle>
            <CardDescription>
                <div className="mt-4 grid grid-cols-2">
                    {savings.map((saving) => (
                        <div key={saving.name} className="flex justify-center items-center mb-8">
                            <div className="flex flex-col items-center">
                                <CircularProgressBar
                                    currentValue={saving.value}
                                    goal={saving.goal}
                                />

                                {saving.name}
                            </div>
                            
                        </div>
                    ))}
                </div>
            </CardDescription>
        </Card>
    );
}


export default DashboardPage;