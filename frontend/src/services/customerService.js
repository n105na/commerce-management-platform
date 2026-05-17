import apiClient from './apiClient'


export async function getCustomers() {

    const response = await apiClient.get(
        'sales/customers/'
    )

    return response.data
}