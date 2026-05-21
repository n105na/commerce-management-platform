import {
    useState,
    useEffect,
} from 'react'

import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'

import Modal from '../../components/ui/Modal'

import Button from '../../components/ui/Button'

import Input from '../../components/ui/Input'

import {

    createUser,
    updateUser,

} from '../../services/userService'


export default function UserModal({

    isOpen,
    onClose,

    user = null,

}) {

    const queryClient =
        useQueryClient()


    const [formData,
        setFormData] =
        useState({

            username: '',

            email: '',

            password: '',

            password_confirm: '',

            role: 'CUSTOMER',

            phone_number: '',

            is_active: true,
        })


    /*
    =====================================
    PREFILL
    =====================================
    */

    useEffect(() => {

        if (user) {

            setFormData({

                username:
                    user.username || '',

                email:
                    user.email || '',

                password: '',

                password_confirm: '',

                role:
                    user.role || 'CUSTOMER',

                phone_number:
                    user.phone_number || '',

                is_active:
                    user.is_active ?? true,
            })

        } else {

            setFormData({

                username: '',

                email: '',

                password: '',

                password_confirm: '',

                role: 'CUSTOMER',

                phone_number: '',

                is_active: true,
            })
        }

    }, [user])


    /*
    =====================================
    MUTATION
    =====================================
    */

    const mutation =
        useMutation({

            mutationFn: (data) => {

                if (user) {

                    return updateUser(

                        user.id,

                        data
                    )
                }

                return createUser(data)
            },

            onSuccess: () => {

                queryClient.invalidateQueries({

                    queryKey: ['users'],
                })

                onClose()
            },
        })


    function handleSubmit(e) {

        e.preventDefault()

        mutation.mutate(formData)
    }


    return (

        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >

            <form
                onSubmit={handleSubmit}

                className="space-y-5"
            >

                {/* TITLE */}

                <div>

                    <h2
                        className="
                            text-3xl
                            font-bold
                            dark:text-white
                        "
                    >

                        {
                            user

                                ? 'Edit User'

                                : 'Create User'
                        }

                    </h2>

                </div>


                {/* USERNAME */}

                <Input
                    type="text"

                    placeholder="Username"

                    value={formData.username}

                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            username:
                                e.target.value,
                        })
                    }
                />


                {/* EMAIL */}

                <Input
                    type="email"

                    placeholder="Email"

                    value={formData.email}

                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            email:
                                e.target.value,
                        })
                    }
                />


                {/* PHONE */}

                <Input
                    type="text"

                    placeholder="Phone number"

                    value={formData.phone_number}

                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            phone_number:
                                e.target.value,
                        })
                    }
                />


                {/* ROLE */}

                <select
                    value={formData.role}

                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            role:
                                e.target.value,
                        })
                    }

                    className="
                        w-full
                        rounded-2xl
                        border
                        border-zinc-200
                        dark:border-zinc-800
                        bg-white
                        dark:bg-zinc-900
                        dark:text-white
                        px-4
                        py-3
                    "
                >

                    <option value="ADMIN">

                        Admin

                    </option>

                    <option value="MANAGER">

                        Manager

                    </option>

                    <option value="WORKER">

                        Worker

                    </option>

                    <option value="CUSTOMER">

                        Customer

                    </option>

                </select>


                {/* ACTIVE */}

                <label
                    className="
                        flex
                        items-center
                        gap-3
                        dark:text-white
                    "
                >

                    <input
                        type="checkbox"

                        checked={formData.is_active}

                        onChange={(e) =>
                            setFormData({

                                ...formData,

                                is_active:
                                    e.target.checked,
                            })
                        }
                    />

                    Active User

                </label>


                {/* PASSWORD */}

                <Input
                    type="password"

                    placeholder={
                        user

                            ? 'New password (optional)'

                            : 'Password'
                    }

                    value={formData.password}

                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            password:
                                e.target.value,
                        })
                    }
                />


                {/* CONFIRM */}

                <Input
                    type="password"

                    placeholder="Confirm password"

                    value={formData.password_confirm}

                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            password_confirm:
                                e.target.value,
                        })
                    }
                />


                {/* SUBMIT */}

                <Button
                    type="submit"

                    className="w-full"
                >

                    {
                        user

                            ? 'Update User'

                            : 'Create User'
                    }

                </Button>

            </form>

        </Modal>
    )
}