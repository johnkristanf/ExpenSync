import { faMagnifyingGlass, faSun, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavBar(){
    return(
        <div className="w-full flex justify-around gap-32">

                <div className="relative w-[30%]">
                    <input 
                        type="search" 
                        className="border border-gray-300 focus:outline-none rounded-md p-3 w-full"
                        placeholder="Search Here"
                    />

                    { 
                        <FontAwesomeIcon 
                            icon={faMagnifyingGlass} 
                            className="absolute top-0 right-0 bg-indigo-600 p-4 rounded-md text-white"
                        /> 
                    }
                </div>
                

                <div className="flex items-center gap-5 ">
                    { <FontAwesomeIcon icon={faSun} className="text-2xl text-indigo-600 hover:cursor-pointer"/> }
                    { <FontAwesomeIcon icon={faUser} className="bg-indigo-600 p-3 rounded-full text-white hover:cursor-pointer"/> }

                </div>


            </div>
    )
}

export default NavBar;