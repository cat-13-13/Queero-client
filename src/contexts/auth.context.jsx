import { createContext, useEffect, useState } from "react"
import authService from "../services/auth.service"

const AuthContext = createContext()

function AuthProviderWrapper(props) {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const storeToken = token => localStorage.setItem('authToken', token)
    const getToken = () => localStorage.getItem('authToken')

    useEffect(() => {
        authenticateUser()
    }, [])

    const authenticateUser = () => {


        if (getToken()) {
            authService
                .verify(getToken())
                .then(({ data }) => {
                    setUser(data)
                    setIsLoading(false)
                })
                .catch(err => logout())
        } else {
            logout()
        }
    }

    const logout = () => {
        localStorage.removeItem('authToken')
        setUser(null)
        setIsLoading(false)
    }


    return (
        <AuthContext.Provider value={{ authenticateUser, user, logout, isLoading, storeToken, getToken }}>
            {props.children}
        </AuthContext.Provider>
    )

}

export { AuthContext, AuthProviderWrapper }