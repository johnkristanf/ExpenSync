import { faBullseye, faCircleDollarToSlot, faGauge, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function SideBar(){
    return(
        <div className="fixed top-0 left-0 h-full w-[8%] flex flex-col gap-5 bg-indigo-600 p-5">
            <img src="/img/expensync_logo.png" alt="ExpenSync Logo"/>

            <Links />
        </div>
    )
}

function Links(){
    const links = [
        {icon: <FontAwesomeIcon icon={faGauge} />, to: "/dashboard"},
        {icon: <FontAwesomeIcon icon={faWallet} />, to: "/wallets"},
        {icon: <FontAwesomeIcon icon={faCircleDollarToSlot} />, to: "/budgets"},
        {icon: <FontAwesomeIcon icon={faBullseye} />, to: "/goals"},
    ]

    return (
        <div className="flex flex-col items-center gap-12 font-semibold text-white ">
            {
                links.map((link) => (
                    <Link key={link.to} to={link.to} className="text-2xl">
                        { link.icon }
                    </Link>
                ))
            }
        </div>
    );
}

export default SideBar;