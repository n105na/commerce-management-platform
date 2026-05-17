import apiClient from './apiClient'


export async function getOrders() {

    const response = await apiClient.get(
        'sales/orders/'
    )

    return response.data
}