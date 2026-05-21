import apiClient from './apiClient'


/*
=====================================
GET USERS
=====================================
*/

export async function getUsers() {

    const response =
        await apiClient.get(
            'users/manage/'
        )

    return response.data
}


/*
=====================================
CREATE USER
=====================================
*/

export async function createUser(
    data
) {

    const response =
        await apiClient.post(

            'users/register/',

            data
        )

    return response.data
}


/*
=====================================
UPDATE USER
=====================================
*/

export async function updateUser(
    userId,
    data
) {

    const response =
        await apiClient.put(

            `users/manage/${userId}/`,

            data
        )

    return response.data
}

/*
=====================================
DELETE USER
=====================================
*/

export async function deleteUser(
    userId
) {

    const response =
        await apiClient.delete(

            `users/manage/${userId}/`
        )

    return response.data
}