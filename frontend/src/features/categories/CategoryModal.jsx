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

    createCategory,
    updateCategory,

} from '../../services/categoryService'


export default function CategoryModal({

    isOpen,
    onClose,
    category = null,

}) {

    const queryClient =
        useQueryClient()


    const [formData, setFormData] = useState({

        name: '',
        description: '',
    })


    useEffect(() => {

        if (category) {

            setFormData({

                name:
                    category.name || '',

                description:
                    category.description || '',
            })

        } else {

            setFormData({

                name: '',
                description: '',
            })
        }

    }, [category])


    const mutation = useMutation({

        mutationFn: (data) =>

            category

                ? updateCategory(
                    category.id,
                    data
                )

                : createCategory(data),


        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ['categories'],
            })

            onClose()
        },
    })


    function handleChange(e) {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,
        })
    }


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

                className="space-y-6"
            >

                <div>

                    <h2
                        className="
                            text-3xl
                            font-bold
                            dark:text-white
                        "
                    >

                        {category
                            ? 'Edit Category'
                            : 'Create Category'
                        }

                    </h2>

                </div>


                <div className="space-y-2">

                    <label className="dark:text-white">

                        Name

                    </label>

                    <Input
                        name="name"

                        value={formData.name}

                        onChange={handleChange}
                    />

                </div>


                <div className="space-y-2">

                    <label className="dark:text-white">

                        Description

                    </label>

                    <textarea
                        name="description"

                        value={formData.description}

                        onChange={handleChange}

                        rows={4}

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
                    />

                </div>


                <Button
                    type="submit"

                    className="w-full"
                >

                    {category
                        ? 'Update Category'
                        : 'Create Category'
                    }

                </Button>

            </form>

        </Modal>
    )
}