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
} from '../../services/productService'

import {
    createProductPrice,
} from '../../services/productPriceService'

import {
    getCategories,
} from '../../services/categoryService'


export default function ProductModal({

    isOpen,
    onClose,

}) {

    const queryClient =
        useQueryClient()


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

        mutationFn: async () => {

            /*
            =====================================
            CREATE PRODUCT
            =====================================
            */

            const productPayload =
                new FormData()


            productPayload.append(
                'name',
                formData.name
            )

            productPayload.append(
                'description',
                formData.description
            )

            productPayload.append(
                'category',
                String(formData.category)
            )

            productPayload.append(
    'is_active',
    formData.is_active
)


            if (formData.image) {

                productPayload.append(
                    'image',
                    formData.image
                )
            }


            const createdProduct =
                await createProduct(
                    productPayload
                )


            /*
            =====================================
            CREATE INITIAL PRICE
            =====================================
            */

            await createProductPrice({

                product:
                    createdProduct.id,

                price:
                    formData.price,

                effective_date:
                    new Date()
                        .toISOString()
                        .split('T')[0],
            })


            return createdProduct
        },


        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ['products'],
            })

            queryClient.invalidateQueries({

                queryKey: ['product-prices'],
            })


            setFormData({

                name: '',
                description: '',
                category: '',
                price: '',
                image: null,
                is_active: true,
            })


            onClose()
        },
    })


    function handleChange(e) {

        const {

            name,
            value,
            type,
            files,
            checked,

        } = e.target


        setFormData({

            ...formData,

            [name]:

                type === 'file'
                    ? files[0]

                    : type === 'checkbox'
                    ? checked

                    : value,
        })
    }


    function handleSubmit(e) {

        e.preventDefault()

        mutation.mutate()
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

                        Create Product

                    </h2>

                    <p className="text-zinc-500 mt-2">

                        Add a new product

                    </p>

                </div>


                {/* NAME */}

                <div className="space-y-2">

                    <label className="dark:text-white">

                        Product Name

                    </label>

                    <Input
                        name="name"

                        placeholder="Enter product name"

                        value={formData.name}

                        onChange={handleChange}
                    />

                </div>


                {/* DESCRIPTION */}

                <div className="space-y-2">

                    <label className="dark:text-white">

                        Description

                    </label>

                    <textarea
                        name="description"

                        rows={4}

                        placeholder="Product description"

                        value={formData.description}

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
                            outline-none
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
                            outline-none
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

                        placeholder="0.00"

                        value={formData.price}

                        onChange={handleChange}
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


                {/* ACTIVE */}

                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >

                    <input
                        type="checkbox"

                        name="is_active"

                        checked={formData.is_active}

                        onChange={handleChange}
                    />

                    <label className="dark:text-white">

                        Product is active

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

        </Modal>
    )
}