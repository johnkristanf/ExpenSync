import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBar from "./navBar";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function Header({ pageName }: {
    pageName: string
}){

    return(
        <div className="flex flex-col gap-8 pt-8">

            <NavBar />

            <div className="w-full flex justify-around gap-32">
                <div className="flex-col">
                    <h1 className="text-4xl text-indigo-800">{ pageName }</h1>
                    <h1 className="opacity-60">Welcome ExpenSync financial managemament</h1>
                </div>

                <h1 className="opacity-60 flex gap-4 items-center">
                    Home 
                    {<FontAwesomeIcon icon={faChevronRight}/>} 
                    { pageName }
                </h1>
            </div>
        </div>    
        
    )
}

export default Header;
