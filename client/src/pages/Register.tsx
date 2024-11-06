import { classNames } from "@/components/className";
import { RegisterInputs } from "@/types/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function RegisterPage(){

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterInputs>();
    const onSubmit: SubmitHandler<RegisterInputs> = data => console.log(data);

    return(
        <>
            <div className="flex justify-center items-center w-full h-screen bg-gray-200">
                <div className={classNames(
                    "bg-indigo-600 w-[40%] flex flex-col gap-3 items-center justify-center font-semibold",
                    Object.keys(errors).length > 0 ? "h-[90%]": "h-[78%]"
                )}>

                    <div className="flex items-center gap-2">
                        <img src="/img/expensync_logo.png" alt="ExpenSync Logo" width={90} />
                        <h1 className="text-6xl text-white">ExpenSync</h1>
                    </div>
                    <h1 className="text-gray-200 text-sm w-[80%] text-center">Track and manage your personal finances effortlessly  with our Expense Tracker, helping you stay on top of your spending and budget effectively.</h1>
                </div>

                <div className={classNames(
                    "w-[40%] bg-white flex flex-col justify-center px-6 py-12 lg:px-8",
                    Object.keys(errors).length > 0 ? "h-[90%]": "h-[78%]"
                )}>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                            Register an account
                        </h2>
                    </div>

                    <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm font-semibold">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        <div>
                            <label htmlFor="fullname" className="block text-sm/6 font-medium text-gray-900">
                                Full name
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register("fullname", { required: true })} 
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>

                            {errors.fullname && <span className="text-red-800">Full Name is required</span>}

                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    {
                                        ...register("email", { 
                                            required: true,
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                message: "Please enter a valid email address",
                                            },
                                        })

                                    } 
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>

                            {
                                errors.email?.type == "required" && <span className="text-red-800">Email is required</span>
                            }

                            {
                                errors.email?.type == "pattern" && <span className="text-red-800">Invalid Email Address</span> 
                            }

                        </div>

                        <div>
                            
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                            Password
                            </label>

                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <div className="mt-2">
                            <input
                                type="password"
                                {...register("password", {
                                    required: true,
                                    minLength: {
                                      value: 8,
                                      message: "Password must be at least 8 characters long",
                                    },
                                })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                        </div>

                        {
                            errors.password?.type == "required" && <span className="text-red-800">Password is required</span>
                        }

                        {
                            errors.password?.type == "minLength" && <span className="text-red-800">Password must be at least 8 characters long</span> 
                        }


                        </div>

                        <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                        </div>
                    </form>

                    <p className=" mt-3 text-center text-sm/6 text-gray-500 font-semibold">
                        Already have an account?{' '}
                        {
                            <Link to={"/signin"} className="text-indigo-600 hover:opacity-75">
                                Sign In here
                            </Link>
                        }
                    </p>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default RegisterPage;