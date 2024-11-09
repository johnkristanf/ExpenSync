import { RotatingLines } from "react-loader-spinner";

export function Loader(){
    return(
        <>
            <div className="fixed top-0 h-screen w-full bg-gray-100 opacity-75"></div>

            <div className="flex justify-center items-center w-full h-screen z-50">
                <RotatingLines 
                    visible={true}
                    width="150"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    strokeColor="#4f46e5" 
                />
            </div>
        </>
    )
}