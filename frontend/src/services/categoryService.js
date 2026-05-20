import apiClient from './apiClient'


export async function getCategories() {

    const response = await apiClient.get(
        'products/categories/'
    )

    return response.data
}


export async function createCategory(
    data
) {

    const response = await apiClient.post(

        'products/categories/',

        data
    )

    return response.data
}


export async function updateCategory(
    id,
    data
) {

    const response = await apiClient.patch(

        `products/categories/${id}/`,

        data
    )

    return response.data
}


export async function deleteCategory(
    id
) {

    const response = await apiClient.delete(

        `products/categories/${id}/`
    )

    return response.data
}