import apiClient from './apiClient'


/*
=====================================
GET PRODUCTS
=====================================
*/

export async function getProducts() {

    const response =
        await apiClient.get(
            'products/products/'
        )

    return response.data
}


/*
=====================================
CREATE PRODUCT
=====================================
*/

export async function createProduct(
    data
) {

    const response =
        await apiClient.post(

            'products/products/',

            data,

            {
                headers: {
                    'Content-Type':
                        'multipart/form-data',
                },
            }
        )

    return response.data
}


/*
=====================================
DELETE PRODUCT
=====================================
*/

export async function deleteProduct(
    productId
) {

    const response =
        await apiClient.delete(

            `products/products/${productId}/`
        )

    return response.data
}