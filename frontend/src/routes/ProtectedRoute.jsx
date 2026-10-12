import {
    Navigate,
} from 'react-router-dom'

import {
    useAuth,
} from '../contexts/AuthContext'


export default function ProtectedRoute({

    children,

    allowedRoles = null,

}) {

    const {
        user,
        loading,
    } = useAuth()


    /*
    =====================================
    LOADING
    =====================================
    */

    if (loading) {

        return (

            <div className="p-10">

                Loading...

            </div>
        )
    }


    /*
    =====================================
    NOT AUTHENTICATED
    =====================================
    */

    if (!user) {

        return (
            <Navigate to="/login" />
        )
    }


    /*
    =====================================
    ROLE PROTECTION
    =====================================
    */

    if (

        allowedRoles &&

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