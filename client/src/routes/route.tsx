import DashboardPage from "@/pages/Dashboard";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import { createBrowserRouter, Navigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const ROUTER = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/signin" />, 
      },

    {
        path: "/signin",
        element: <LoginPage />,
    },

    {
        path: "/register",
        element: <RegisterPage />,
    },

    {
        path: "/dashboard",
        element: <DashboardPage />,
    },
])