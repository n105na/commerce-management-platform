import {
    Navigate,
} from 'react-router-dom'

import {
    useAuth,
} from '../contexts/AuthContext'


export default function RoleProtectedRoute({

    children,
    allowedRoles,

}) {

    const {
        user,
        loading,
    } = useAuth()


    if (loading) {

        return (
            <div className="p-10">
                Loading...
            </div>
        )
    }


    if (!user) {

        return (
            <Navigate to="/login" />
        )
    }


    if (
        !allowedRoles.includes(
            user.role
        )
    ) {

        return (
            <Navigate to="/" />
        )
    }


    return children
}