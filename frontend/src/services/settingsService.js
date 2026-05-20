import apiClient from './apiClient'


export async function getPlatformSettings() {

    const response = await apiClient.get(
        'settings/platform/'
    )

    return response.data
}


export async function updatePlatformSettings(
    data
) {

    const formData = new FormData()


    Object.keys(data).forEach((key) => {

        if (
            data[key] !== null &&
            data[key] !== undefined
        ) {

            formData.append(
                key,
                data[key]
            )
        }
    })


    const response = await apiClient.patch(

        'settings/platform/',

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