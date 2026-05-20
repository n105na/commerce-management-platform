import apiClient from './apiClient'


/*
=====================================
GET CUSTOMERS
=====================================
*/

export async function getCustomers() {

    const response =
        await apiClient.get(
            'sales/customers/'
        )

    return response.data
}


/*
=====================================
CREATE CUSTOMER
=====================================
*/

export async function createCustomer(
    data
) {

    const response =
        await apiClient.post(

            'sales/customers/',

            data
        )

    return response.data
}


/*
=====================================
DELETE CUSTOMER
=====================================
*/

export async function deleteCustomer(
    customerId
) {

    const response =
        await apiClient.delete(

            `sales/customers/${customerId}/`
        )

    return response.data
}

/*
=====================================
UPDATE CUSTOMER
=====================================
*/

export async function updateCustomer(
    customerId,
    data
) {

    const response =
        await apiClient.put(

            `sales/customers/${customerId}/`,

            data
        )

    return response.data
}