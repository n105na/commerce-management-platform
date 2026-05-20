import apiClient from './apiClient'


export async function createProductPrice(
    data
) {

    const response =
        await apiClient.post(

            'products/prices/',

            data
        )

    return response.data
}