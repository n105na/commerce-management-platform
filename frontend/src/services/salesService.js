import apiClient from './apiClient'


export async function getOrders() {

    const response =
        await apiClient.get(
            'sales/orders/'
        )

    return response.data
}


export async function createOrder(
    data
) {

    const response =
        await apiClient.post(

            'sales/orders/',

            data
        )

    return response.data
}


export async function createOrderItem(
    data
) {

    const response =
        await apiClient.post(

            'sales/order-items/',

            data
        )

    return response.data
}
export async function cancelOrder(
    orderId
) {

    const response =
        await apiClient.post(

            `sales/orders/${orderId}/cancel/`
        )

    return response.data
}


export async function deleteOrder(
    orderId
) {

    const response =
        await apiClient.delete(

            `sales/orders/${orderId}/`
        )

    return response.data
}