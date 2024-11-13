import { addNewWallet } from "@/api/post/wallets";

import { 
    AlertDialog,
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle   
} from "@/components/ui/alert-dialog";

import { AddWalletType } from "@/types/wallets";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import SuccessDialog from "@/components/successDialog";
import { classNames } from "@/components/className";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from '@iconify/react';

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSearchIcons } from "@/hooks/useSearchIcons";


function AddNewWalletModal(){

    const [searchIcon, setSearchIcon] = useState<string>();
    const [clickedIcon, setClickedIcon] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);

    const queryClient = useQueryClient();
    const { matchingIcons, isSearchingIcons } = useSearchIcons(searchIcon);

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
                queryClient.invalidateQueries({queryKey: ['wallets']})
            }, 3000);
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
                    <div className="flex justify-between bg-white rounded-md p-6 w-full border border-gray-200 hover:cursor-pointer">
                        <h1 className="text-indigo-800">Add new wallet</h1>
                        <FontAwesomeIcon 
                            icon={faPlus} 
                            className="bg-indigo-100 text-indigo-600 p-1 rounded-md border border-indigo-600 "
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
                                        isSearchingIcons && (
                                            <h1 className="text-indigo-600 font-semibold text-xl">
                                                Searching Icons....
                                            </h1>
                                        )
                                    }


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


export default AddNewWalletModal;