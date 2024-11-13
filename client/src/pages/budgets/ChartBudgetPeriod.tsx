import { Card, CardContent,  CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid,  XAxis, YAxis } from "recharts";

function ChartBudgetPeriod(){

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

    return(
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

    )
}

export default ChartBudgetPeriod;