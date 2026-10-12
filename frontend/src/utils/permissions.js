/*
=====================================
ROLE HELPERS
=====================================
*/

export function isAdmin(user) {

    return user?.role === 'ADMIN'
}


export function isManager(user) {

    return user?.role === 'MANAGER'
}


export function isWorker(user) {

    return user?.role === 'WORKER'
}


export function isCustomer(user) {

    return user?.role === 'CUSTOMER'
}


/*
=====================================
CUSTOMERS
=====================================
*/

export function canManageCustomers(
    user
) {

    return [

        'ADMIN',
        'MANAGER',

    ].includes(user?.role)
}


/*
=====================================
FINANCE
=====================================
*/

export function canManageFinance(
    user
) {

    return [

        'ADMIN',
        'MANAGER',

    ].includes(user?.role)
}


/*
=====================================
PRODUCTS
=====================================
*/

export function canEditProducts(
    user
) {

    return [

        'ADMIN',
        'MANAGER',

    ].includes(user?.role)
}


export function canDeleteProducts(
    user
) {

    return user?.role === 'ADMIN'
}


/*
=====================================
USERS
=====================================
*/

export function canManageUsers(
    user
) {

    return user?.role === 'ADMIN'
}