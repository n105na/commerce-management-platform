import apiClient from './apiClient'


/*
=====================================
GET INVENTORY ITEMS
=====================================
*/

export async function getInventoryItems() {

    const response =
        await apiClient.get(
            'inventory/inventory-items/'
        )

    return response.data
}


/*
=====================================
GET STOCK MOVEMENTS
=====================================
*/

export async function getStockMovements() {

    const response =
        await apiClient.get(
            'inventory/stock-movements/'
        )

    return response.data
}


/*
=====================================
CREATE STOCK MOVEMENT
=====================================
*/

export async function createStockMovement(
    data
) {

    const response =
        await apiClient.post(

            'inventory/stock-movements/',

            data
        )

    return response.data
}