import DashboardPage from "@/pages/Dashboard";
import SignInPage from "@/pages/SignIn";
import RegisterPage from "@/pages/Register";
import queryClient from "@/utils/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, Navigate } from "react-router-dom";
import WalletsPage from "@/pages/Wallets";
import BudgetsPage from "@/pages/Budgets";

// eslint-disable-next-line react-refresh/only-export-components
export const ROUTER = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/signin" />, 
      },

    {
        path: "/signin",
        element: (
            <QueryClientProvider client={queryClient}>
                <SignInPage />
            </QueryClientProvider>
        ),
    },

    {
        path: "/register",
        element: (
            <QueryClientProvider client={queryClient}>
                <RegisterPage />
            </QueryClientProvider>
        ),
    },

    {
        path: "/dashboard",
        element: <DashboardPage />,
    },

    {
        path: "/wallets",
        element:  (
            <QueryClientProvider client={queryClient}>
                <WalletsPage />
            </QueryClientProvider>
        ),
    },

    {
        path: "/budgets",
        element:  (
            <QueryClientProvider client={queryClient}>
                <BudgetsPage />
            </QueryClientProvider>
        ),
    },
])