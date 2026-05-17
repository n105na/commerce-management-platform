import apiClient from './apiClient'


export async function getProducts() {

    const response = await apiClient.get(
        'products/products/'
    )

    return response.data
}


export async function createProduct(productData) {

    const formData = new FormData()


    formData.append(
        'name',
        productData.name
    )

    formData.append(
        'description',
        productData.description
    )

    formData.append(
        'category',
        productData.category
    )

    formData.append(
        'price',
        productData.price
    )

    formData.append(
        'is_active',
        productData.is_active
    )


    if (productData.image) {

        formData.append(
            'image',
            productData.image
        )
    }


    const response = await apiClient.post(

        'products/products/',

        formData,

        {
            headers: {
                'Content-Type':
                    'multipart/form-data',
            },
        }
    )

    return response.data
}


export async function getCategories() {

    const response = await apiClient.get(
        'products/categories/'
    )

    return response.data
}