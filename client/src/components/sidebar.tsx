function SideBar(){
    return(
        <div className="absolute top-0 left-0 h-screen w-[8%] flex flex-col gap-5 bg-indigo-600 p-5">
            <img src="/img/expensync_logo.png" alt="ExpenSync Logo"/>
        </div>
    )
}

function Links(){
    const link = [
        {icon: , to: "/dashboard"},
        {icon: , to: "/wallets"},
        {icon: , to: "/budgets"},
        {icon: , to: "/goals"},
    ]
}

export default SideBar;