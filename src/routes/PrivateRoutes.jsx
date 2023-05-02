import { useContext } from "react"
import { Spinner } from "react-rainbow-components"
import { Outlet, Navigate } from "react-router-dom"
import { AuthContext } from "../contexts/auth.context"

const PrivateRoute = () => {

    const { user, isLoading } = useContext(AuthContext)


    if (isLoading) {
        return <Spinner size="large" />
    }

    if (!user) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}

export default PrivateRoute