import useUser from "@/features/authentication/useUser";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpinnerFullPage from "./ui/spinnerFullPage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate()
    // 1. Load the authentication user
    const { isAuthenticated, isLoading } = useUser()

    // 2. If there is NO authentication user, redirect to the /login
    useEffect(() => {
        if (!isAuthenticated && !isLoading) navigate("/login")
    }, [isAuthenticated, navigate, isLoading])

    // 3. while loading, show a spinner
    if (isLoading) return <SpinnerFullPage />

    // 4. If there is a user, render the app
    if (isAuthenticated) return children
}

export default ProtectedRoute;