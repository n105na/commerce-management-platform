import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'

import apiClient from '../services/apiClient'


const AuthContext = createContext()


export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)

    const [loading, setLoading] = useState(true)


    // ==========================================
    // LOGIN
    // ==========================================

    async function login(
        username,
        password
    ) {

        const response = await apiClient.post(
            'users/login/',
            {
                username,
                password,
            }
        )

        localStorage.setItem(
            'access_token',
            response.data.access
        )

        localStorage.setItem(
            'refresh_token',
            response.data.refresh
        )

        await fetchCurrentUser()
    }


    // ==========================================
    // LOGOUT
    // ==========================================

    function logout() {

        localStorage.removeItem(
            'access_token'
        )

        localStorage.removeItem(
            'refresh_token'
        )

        setUser(null)
    }


    // ==========================================
    // CURRENT USER
    // ==========================================

    async function fetchCurrentUser() {

        try {

            const response = await apiClient.get(
                'users/me/'
            )

            setUser(response.data)

        } catch {

            logout()

        } finally {

            setLoading(false)
        }
    }


    // ==========================================
    // INITIAL LOAD
    // ==========================================

    useEffect(() => {

        const token = localStorage.getItem(
            'access_token'
        )

        if (token) {

            fetchCurrentUser()

        } else {

            setLoading(false)
        }

    }, [])


    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
            }}
        >

            {children}

        </AuthContext.Provider>
    )
}


export function useAuth() {

    return useContext(AuthContext)
}