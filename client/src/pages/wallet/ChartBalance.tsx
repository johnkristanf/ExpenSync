import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid,  XAxis, YAxis } from "recharts";


function ChartBalanceOvertime(){

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
    )
}

export default ChartBalanceOvertime;