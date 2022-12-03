import { Auth } from "../utils/Auth"
import { Outlet, Navigate } from "react-router-dom"
import LoginPage from '../pages/LoginPage'

export default function ProtectedRoute() {
    const { token } = Auth.isAuthorization()

    if (!token) {
        return <Navigate to="/admin/login" replace />
    }

    return <LoginPage />
}