import { faCircleDollarToSlot, faGauge, faMoneyBillTrendUp, faPiggyBank, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";



import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { TooltipTrigger } from "@radix-ui/react-tooltip";

function SideBar(){
    return(
        <div className="fixed top-0 left-0 h-full w-[8%] flex flex-col gap-5 bg-indigo-600 p-5">
            <img src="/img/expensync_logo.png" alt="ExpenSync Logo"/>

            <Links />
        </div>
    )
}

function Links() {
    const links = [
        {icon: faGauge, to: "/dashboard", name: "Dashboard"},
        {icon: faWallet, to: "/wallets", name: "Wallets"},
        {icon: faCircleDollarToSlot, to: "/budgets", name: "Budgets"},
        {icon: faPiggyBank, to: "/savings", name: "Savings"},
        {icon: faMoneyBillTrendUp, to: "/investments", name: "Investments"},
    ];

    return (
        <div className="flex flex-col items-center gap-12 font-semibold text-white">
            {links.map((link) => (
                <TooltipProvider key={link.to}>
                    <Tooltip delayDuration={50} >
                        <TooltipTrigger asChild>
                            <Link to={link.to} className="text-2xl">
                                <FontAwesomeIcon icon={link.icon}/>
                            </Link>
                        </TooltipTrigger>

                        <TooltipContent side="right" align="center" className="text-indigo-600 bg-white font-semibold text-sm">
                            <p>{link.name}</p>
                        </TooltipContent>

                    </Tooltip>
                </TooltipProvider>
            ))}
        </div>
    );
}



export default SideBar;