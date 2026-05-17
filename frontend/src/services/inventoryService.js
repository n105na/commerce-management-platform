import apiClient from './apiClient'


export async function getInventoryItems() {

    const response = await apiClient.get(
        'inventory/inventory-items/'
    )

    return response.data
}