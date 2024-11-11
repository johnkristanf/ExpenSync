import Header from "@/components/header";
import SideBar from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { faBank } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Area, AreaChart, CartesianGrid,  XAxis, YAxis } from "recharts";


import { getIcons } from "@/api/get/icon";
import { 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle   
} from "@/components/ui/alert-dialog";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Icon } from '@iconify/react';

import { AlertDialog, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AddWalletType } from "@/types/wallets";
import { SubmitHandler, useForm } from "react-hook-form";
import { addNewWallet } from "@/api/post/wallets";
import { useState } from "react";
import { classNames } from "@/components/className";
import SuccessDialog from "@/components/successDialog";


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

                <div className="flex flex-col gap-4 items-center w-[20%]">

                    <div className="flex gap-4 bg-white rounded-md p-6 w-full">
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


                    <div className="flex gap-4 bg-white rounded-md p-6 w-full">
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


                    <AddNewWalletModal />

                </div>

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


function AddNewWalletModal(){

    const [searchIcon, setSearchIcon] = useState<string>();
    const [clickedIcon, setClickedIcon] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);

    const { data } = useQuery({
        queryKey: ['icons'],
        queryFn: getIcons,
    });

    const matchingIcons = searchIcon && data.uncategorized
        .filter((icon: string) => icon.toLowerCase().includes(searchIcon))
        .slice(0, 6); 

    const { register, handleSubmit, reset, setValue } = useForm<AddWalletType>();

    const mutation = useMutation({
        mutationFn: addNewWallet,
        onSuccess: (data) => {
            console.log("Wallet added successfully:", data);
            setOpenSuccessDialog(true)
            setOpen(false);
            setSearchIcon("");
            reset();

            setTimeout(() => {
                setOpenSuccessDialog(false);
            }, 3000);

            // For example, you might want to update the state or show a success message
            // setWallets([...wallets, data]); // I add ang wallets sa zustand state
        },
        onError: (error) => {
            console.error(`Add New Wallet Error: ${error.message}`);
        }
    })


    const onSubmit: SubmitHandler<AddWalletType> = data => mutation.mutate(data)
    
    return (
        <>
            { openSuccessDialog && (
                <SuccessDialog 
                    title="Added New Wallet Successfully!"
                    message="You can now procceed on making your budget"
                />
            ) }

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <div className="flex justify-between bg-white rounded-md p-6 w-full border border-gray-200">
                        <h1 className="text-indigo-800">Add new wallet</h1>
                        <FontAwesomeIcon 
                            icon={faPlus} 
                            className="bg-indigo-100 text-indigo-600 p-1 rounded-md border border-indigo-600"
                        />
                    </div>
                </AlertDialogTrigger>

                <AlertDialogContent >
                    <AlertDialogHeader>
                        <AlertDialogTitle>Set your Wallet Information</AlertDialogTitle>

                        <AlertDialogDescription>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                                <div>
                                    <label htmlFor="icon" className="block text-sm/6 font-medium text-gray-900">
                                        Search Icon
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                            value={searchIcon}
                                            onChange={(e) => setSearchIcon(e.target.value)}
                                        />
                                    </div>

                                </div>

                                <div className="flex gap-4 flex-wrap">
                                    {
                                        matchingIcons && matchingIcons.length > 0 && matchingIcons.map((icon: string) => (
                                            <div 
                                                key={icon} 
                                                className={`flex flex-col items-center p-4 w-[30%] rounded-md text-white hover:opacity-75 cursor-pointer ${
                                                    clickedIcon === icon ? 'bg-indigo-800 opacity-50 cursor-not-allowed' : 'bg-indigo-600'
                                                }`} 
                                                onClick={() => {
                                                    if (clickedIcon !== icon) {
                                                        setClickedIcon(icon); 
                                                        setValue("icon", icon); 
                                                    }
                                                }} 
                                            >
                                                <Icon 
                                                    icon={`fa:${icon}`} 
                                                    width={20} 
                                                    height={20} 
                                                />

                                                {icon}
                                            </div>
                                        ))
                                    }
                                </div>  


                                <div>
                                    <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                        Wallet Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {
                                                ...register("name", { 
                                                    required: true,
                                                })

                                            } 
                                            type="text"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                        />
                                    </div>

                                </div>

                                <div>
                                    <label htmlFor="amount" className="block text-sm/6 font-medium text-gray-900">
                                        Amount
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {
                                                ...register("amount", { 
                                                    required: true,
                                                })

                                            } 
                                            type="number"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                        />
                                    </div>

                                </div>
                                    
                                

                                <div>
                                    <button
                                        type="submit"
                                        disabled={mutation.isPending}
                                        className={classNames(
                                            "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                                            mutation.isPending ? "bg-gray-400 cursor-not-allowed" : ""
                                        )}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </AlertDialogDescription>

                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel 
                            className={classNames(
                                "w-full bg-black text-white",
                                mutation.isPending ? "bg-gray-400 cursor-not-allowed" : ""
                            )}
                            disabled={mutation.isPending}
                        >
                            Cancel
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default WalletsPage;