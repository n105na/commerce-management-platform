import {
    useState,
} from 'react'

import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'

import Modal from '../../components/ui/Modal'

import Button from '../../components/ui/Button'

import Input from '../../components/ui/Input'

import {

    createProduct,
    getCategories,

} from '../../services/productService'


export default function ProductModal({

    isOpen,
    onClose,

}) {

    const queryClient = useQueryClient()


    const [formData, setFormData] = useState({

        name: '',
        description: '',
        category: '',
        price: '',
        image: null,
        is_active: true,
    })


    const {

        data: categoriesData,

    } = useQuery({

        queryKey: ['categories'],

        queryFn: getCategories,
    })


    const categories =
        categoriesData?.results || []


    const mutation = useMutation({

        mutationFn: createProduct,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ['products'],
            })

            onClose()
        },
    })


    function handleChange(e) {

        const {

            name,
            value,
            type,
            checked,
            files,

        } = e.target


        setFormData({

            ...formData,

            [name]:

                type === 'checkbox'
                    ? checked

                    : type === 'file'
                    ? files[0]

                    : value,
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

            <div className="space-y-6">

                <div>

                    <h2
                        className="
                            text-3xl
                            font-bold
                            dark:text-white
                        "
                    >

                        Add Product

                    </h2>

                    <p className="text-zinc-500 mt-2">

                        Create a new product

                    </p>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* NAME */}

                    <div className="space-y-2">

                        <label className="dark:text-white">

                            Product Name

                        </label>

                        <Input
                            name="name"

                            value={formData.name}

                            onChange={handleChange}

                            placeholder="Fresh Eggs"
                        />

                    </div>


                    {/* DESCRIPTION */}

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


                    {/* CATEGORY */}

                    <div className="space-y-2">

                        <label className="dark:text-white">

                            Category

                        </label>

                        <select
                            name="category"

                            value={formData.category}

                            onChange={handleChange}

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

                            <option value="">

                                Select category

                            </option>

                            {categories.map((category) => (

                                <option
                                    key={category.id}

                                    value={category.id}
                                >

                                    {category.name}

                                </option>
                            ))}

                        </select>

                    </div>


                    {/* PRICE */}

                    <div className="space-y-2">

                        <label className="dark:text-white">

                            Initial Price

                        </label>

                        <Input
                            type="number"

                            step="0.01"

                            name="price"

                            value={formData.price}

                            onChange={handleChange}

                            placeholder="10.00"
                        />

                    </div>


                    {/* IMAGE */}

                    <div className="space-y-2">

                        <label className="dark:text-white">

                            Product Image

                        </label>

                        <input
                            type="file"

                            name="image"

                            accept="image/*"

                            onChange={handleChange}

                            className="
                                w-full
                                border
                                border-zinc-200
                                dark:border-zinc-800
                                rounded-2xl
                                px-4
                                py-3
                                dark:text-white
                            "
                        />

                    </div>


                    {/* ACTIVE */}

                    <div className="flex items-center gap-3">

                        <input
                            type="checkbox"

                            name="is_active"

                            checked={formData.is_active}

                            onChange={handleChange}
                        />

                        <label className="dark:text-white">

                            Active Product

                        </label>

                    </div>


                    {/* SUBMIT */}

                    <Button
                        type="submit"

                        className="w-full"
                    >

                        Create Product

                    </Button>

                </form>

            </div>

        </Modal>
    )
}