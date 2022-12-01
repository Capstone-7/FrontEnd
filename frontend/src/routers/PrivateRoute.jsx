import { Auth } from "../utils/Auth"
import { Outlet, Navigate } from "react-router-dom"

export default function PrivateRoute() {
    const { token } = Auth.isAuthorization()

    if (token) {
        return <Navigate to="/admin" replace />
    }

    return <Outlet />
}