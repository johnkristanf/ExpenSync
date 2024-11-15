import { 
    AlertDialog,
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogHeader, 
    AlertDialogTitle   
} from "@/components/ui/alert-dialog";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import SuccessDialog from "@/components/successDialog";
import { classNames } from "@/components/className";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from '@iconify/react';

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSearchIcons } from "@/hooks/useSearchIcons";
import { AddBudgetType } from "@/types/budgets";
import { addNewBudget } from "@/api/post/budget";
import { getWallets } from "@/api/get/wallets";
import { Wallet } from "@/types/wallets";

function AddBudgetWalletModal() {
    const [searchIcon, setSearchIcon] = useState<string>("car");
    const [clickedIcon, setClickedIcon] = useState<string | null>(null);

    // add this on the zustand to make it cleaner
    const [open, setOpen] = useState<boolean>(false);
    const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);

    const queryClient = useQueryClient();
    const { matchingIcons, isSearchingIcons } = useSearchIcons(searchIcon);
    
    const { register, handleSubmit, reset, setValue } = useForm<AddBudgetType>();

    const mutation = useMutation({
        mutationFn: addNewBudget,
        onSuccess: (data) => {
            console.log("Wallet added successfully:", data);
            setOpenSuccessDialog(true);
            setOpen(false);
            setSearchIcon("");
            reset();

            setTimeout(() => {
                setOpenSuccessDialog(false);
                queryClient.invalidateQueries({ queryKey: ['wallets'] });
            }, 3000);
        },
        onError: (error) => {
            console.error(`Add New Wallet Error: ${error.message}`);
        }
    });

    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ['wallets'],
        queryFn: getWallets
    });

    const wallets: Wallet[] = data;

    const onSubmit: SubmitHandler<AddBudgetType> = (data) => mutation.mutate(data);
    
    return (
        <>
            {openSuccessDialog && (
                <SuccessDialog 
                    title="Added New Budget Successfully!"
                    message="You can now proceed on making your transactions"
                />
            )}

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <div className="flex justify-between bg-white rounded-md p-6 w-full border border-gray-200 hover:cursor-pointer">
                        <h1 className="text-indigo-800">Add new budget</h1>
                        <FontAwesomeIcon 
                            icon={faPlus} 
                            className="bg-indigo-100 text-indigo-600 p-1 rounded-md border border-indigo-600 "
                        />
                    </div>
                </AlertDialogTrigger>

                <AlertDialogContent className="max-h-[80vh] overflow-auto">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Set your Budget Information</AlertDialogTitle>

                        <AlertDialogDescription className="flex flex-col items-center">
                            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6 flex flex-col gap-12 items-center justify-center p-4">

                                <div className="w-full flex flex-col items-center justify-center gap-8">
                                    <div className="w-full">
                                        <label htmlFor="icon" className="block text-sm font-medium text-gray-900">
                                            Search Icon
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                                onChange={(e) => setSearchIcon(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4 flex-wrap w-full">
                                        {isSearchingIcons && (
                                            <h1 className="text-indigo-600 font-semibold text-xl">
                                                Searching Icons....
                                            </h1>
                                        )}

                                        {matchingIcons && matchingIcons.length > 0 && matchingIcons.map((icon: string) => (
                                            <div 
                                                key={icon} 
                                                className={`flex flex-col items-center p-2 w-[20%] rounded-md text-white hover:opacity-75 cursor-pointer ${
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
                                            </div>
                                        ))}
                                    </div> 
                                </div>

                                <div className="w-full flex flex-col items-center gap-8">
                                    <div className="w-full">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                                            Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register("name", { required: true })}
                                                type="text"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full">
                                        <label htmlFor="period" className="block text-sm font-medium text-gray-900">
                                            Period
                                        </label>
                                        <div className="mt-2 font-semibold">
                                            <select
                                                {...register("period", { required: true })}
                                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                            >
                                                <option value="Day">Day</option>
                                                <option value="Week">Week</option>
                                                <option value="Month">Month</option>
                                                <option value="Year">Year</option>
                                            </select>
                                        </div>
                                    </div>

                                    {isLoading && (
                                        <h1 className="text-indigo-600 font-semibold text-xl">
                                            Loading Budget Card...
                                        </h1>
                                    )}

                                    {isSuccess && (
                                        <div className="w-full">
                                            <label htmlFor="wallet_id" className="block text-sm font-medium text-gray-900">
                                                Card
                                            </label>
                                            <div className="mt-2 font-semibold">
                                                <select
                                                    {...register("wallet_id", { required: true })}
                                                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                                >
                                                    {wallets.map((wallet) => (
                                                        <option key={wallet.id} value={wallet.id}>
                                                            {wallet.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    )}

                                    <div className="w-full">
                                        <label htmlFor="budget" className="block text-sm font-medium text-gray-900">
                                            Amount
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register("budget", { required: true })}
                                                type="number"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                  
                                    <div className="w-full">
                                        <button
                                            type="submit"
                                            disabled={mutation.isPending}
                                            className={classNames(
                                                "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                                                mutation.isPending ? "bg-gray-400 cursor-not-allowed" : ""
                                            )}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>

                            <button 
                                className={classNames(
                                    "w-full bg-black text-white p-2 rounded-md w-[93%] hover:opacity-75",
                                    mutation.isPending ? "bg-gray-400 cursor-not-allowed" : ""
                                )}
                                disabled={mutation.isPending}
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </button>
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default AddBudgetWalletModal;
