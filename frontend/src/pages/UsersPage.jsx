import {
    useState,
} from 'react'

import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'

import {

    Shield,
    User,
    Pencil,
    Trash2,

} from 'lucide-react'

import Card from '../components/ui/Card'

import Button from '../components/ui/Button'

import Modal from '../components/ui/Modal'

import PageHeader from '../components/ui/PageHeader'

import UserModal from '../features/users/UserModal'

import {

    getUsers,
    deleteUser,

} from '../services/userService'


export default function UsersPage() {

    const queryClient =
        useQueryClient()


    const [

        isModalOpen,

        setIsModalOpen,

    ] = useState(false)


    const [

        selectedUser,

        setSelectedUser,

    ] = useState(null)


    const [

        userToDelete,

        setUserToDelete,

    ] = useState(null)


    const {

        data,
        isLoading,

    } = useQuery({

        queryKey: ['users'],

        queryFn: getUsers,
    })


    /*
    =====================================
    DELETE
    =====================================
    */

    const deleteMutation =
        useMutation({

            mutationFn: deleteUser,

            onSuccess: () => {

                queryClient.invalidateQueries({

                    queryKey: ['users'],
                })

                setUserToDelete(null)
            },
        })


    if (isLoading) {

        return (
            <div className="p-6">
                Loading users...
            </div>
        )
    }


    const users =
        data?.results || []


    function handleDelete() {

        if (!userToDelete)
            return

        deleteMutation.mutate(
            userToDelete.id
        )
    }


    return (

        <div className="space-y-8">

            {/* HEADER */}

            <PageHeader
                title="Users"

                description="Manage platform users and roles"

                action={

                    <Button
                        onClick={() => {

                            setSelectedUser(null)

                            setIsModalOpen(true)
                        }}
                    >

                        Add User

                    </Button>
                }
            />


            {/* GRID */}

            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-3
                    gap-6
                "
            >

                {users.map((user) => (

                    <Card
                        key={user.id}

                        className="p-6"
                    >

                        {/* TOP */}

                        <div className="flex items-start justify-between">

                            <div>

                                <h2
                                    className="
                                        text-xl
                                        font-bold
                                        dark:text-white
                                    "
                                >

                                    {user.username}

                                </h2>

                                <p className="text-zinc-500 mt-1">

                                    {user.email}
                                </p>

                            </div>


                            {/* ICON */}

                            <div
                                className="
                                    w-12
                                    h-12
                                    rounded-2xl
                                    bg-zinc-100
                                    dark:bg-zinc-800
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                <User
                                    size={22}
                                    className="
                                        text-zinc-700
                                        dark:text-zinc-300
                                    "
                                />

                            </div>

                        </div>


                        {/* ROLE */}

                        <div className="mt-6">

                            <div
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    px-3
                                    py-1
                                    rounded-full
                                    bg-zinc-100
                                    dark:bg-zinc-800
                                "
                            >

                                <Shield
                                    size={14}
                                />

                                <span
                                    className="
                                        text-sm
                                        font-medium
                                        dark:text-white
                                    "
                                >

                                    {user.role}

                                </span>

                            </div>

                        </div>


                        {/* STATUS */}

                        <div className="mt-4">

                            {user.is_active ? (

                                <span
                                    className="
                                        px-3
                                        py-1
                                        rounded-full
                                        bg-green-100
                                        text-green-600
                                        text-sm
                                        font-medium
                                    "
                                >

                                    Active

                                </span>

                            ) : (

                                <span
                                    className="
                                        px-3
                                        py-1
                                        rounded-full
                                        bg-red-100
                                        text-red-600
                                        text-sm
                                        font-medium
                                    "
                                >

                                    Inactive

                                </span>
                            )}

                        </div>


                        {/* ACTIONS */}

                        <div className="mt-6 flex justify-end gap-2">

                            {/* EDIT */}

                            <Button
                                onClick={() => {

                                    setSelectedUser(user)

                                    setIsModalOpen(true)
                                }}
                            >

                                <Pencil size={16} />

                            </Button>


                            {/* DELETE */}

                            <Button
                                className="
                                    bg-red-600
                                    hover:bg-red-700
                                "

                                onClick={() =>
                                    setUserToDelete(user)
                                }
                            >

                                <Trash2 size={16} />

                            </Button>

                        </div>

                    </Card>
                ))}

            </div>


            {/* USER MODAL */}

            <UserModal
                isOpen={isModalOpen}

                onClose={() => {

                    setIsModalOpen(false)

                    setSelectedUser(null)
                }}

                user={selectedUser}
            />


            {/* DELETE MODAL */}

            <Modal
                isOpen={!!userToDelete}

                onClose={() =>
                    setUserToDelete(null)
                }
            >

                <div className="space-y-6">

                    <div>

                        <h2
                            className="
                                text-2xl
                                font-bold
                                dark:text-white
                            "
                        >

                            Delete User

                        </h2>

                        <p className="text-zinc-500 mt-2">

                            Are you sure you want to delete

                            <span className="font-semibold">

                                {' '}
                                {userToDelete?.username}
                            </span>

                            ?
                        </p>

                    </div>


                    <div className="flex gap-3">

                        <Button
                            className="w-full"

                            onClick={() =>
                                setUserToDelete(null)
                            }
                        >

                            Cancel

                        </Button>


                        <Button
                            className="
                                w-full
                                bg-red-600
                                hover:bg-red-700
                            "

                            onClick={handleDelete}
                        >

                            Delete

                        </Button>

                    </div>

                </div>

            </Modal>

        </div>
    )
}