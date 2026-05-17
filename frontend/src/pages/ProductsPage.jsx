import {
    useState,
} from 'react'

import {
    useQuery,
} from '@tanstack/react-query'

import Button from '../components/ui/Button'

import Input from '../components/ui/Input'

import Card from '../components/ui/Card'

import PageHeader from '../components/ui/PageHeader'

import ProductModal from '../features/products/ProductModal'

import {
    getProducts,
} from '../services/productService'


export default function ProductsPage() {

    const [search, setSearch] = useState('')

    const [isModalOpen, setIsModalOpen] = useState(false)


    const {

        data,
        isLoading,

    } = useQuery({

        queryKey: ['products'],

        queryFn: getProducts,
    })


    if (isLoading) {

        return (

            <div className="p-6">

                Loading products...

            </div>
        )
    }


    const products = data?.results || []


    const filteredProducts = products.filter(

        (product) =>

            product.name
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
    )


    return (

        <div className="space-y-8">

            {/* HEADER */}

            <PageHeader
                title="Products"

                description="Manage your products and pricing"

                action={

                    <Button
                        onClick={() =>
                            setIsModalOpen(true)
                        }
                    >

                        Add Product

                    </Button>
                }
            />


            {/* SEARCH */}

            <div className="max-w-md">

                <Input
                    type="text"

                    placeholder="Search products..."

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

            </div>


            {/* PRODUCTS GRID */}

            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-3
                    gap-6
                "
            >

                {filteredProducts.map((product) => (

                    <Card
                        key={product.id}

                        className="
                            overflow-hidden
                            transition-all
                            hover:translate-y-[-2px]
                        "
                    >

                        {/* IMAGE */}

                        <div
                            className="
                                h-48
                                bg-zinc-100
                                dark:bg-zinc-800
                                overflow-hidden
                            "
                        >

                            {product.image ? (

                                <img
                                    src={product.image}

                                    alt={product.name}

                                    className="
                                        w-full
                                        h-full
                                        object-cover
                                    "
                                />

                            ) : (

                                <div
                                    className="
                                        w-full
                                        h-full
                                        flex
                                        items-center
                                        justify-center
                                        text-zinc-400
                                        text-sm
                                    "
                                >

                                    No Image

                                </div>
                            )}

                        </div>


                        {/* CONTENT */}

                        <div className="p-5 space-y-4">

                            {/* TOP */}

                            <div
                                className="
                                    flex
                                    items-start
                                    justify-between
                                    gap-4
                                "
                            >

                                <div>

                                    <h2
                                        className="
                                            text-xl
                                            font-bold
                                            dark:text-white
                                        "
                                    >

                                        {product.name}

                                    </h2>

                                    <p
                                        className="
                                            text-zinc-500
                                            text-sm
                                            mt-1
                                            line-clamp-2
                                        "
                                    >

                                        {product.description || 'No description'}

                                    </p>

                                </div>


                                <span
                                    className="
                                        shrink-0
                                        px-3
                                        py-1
                                        rounded-full
                                        bg-zinc-100
                                        dark:bg-zinc-800
                                        text-xs
                                        text-zinc-600
                                        dark:text-zinc-300
                                    "
                                >

                                    {product.category_name || 'Category'}

                                </span>

                            </div>


                            {/* BOTTOM */}

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                "
                            >

                                {/* PRICE */}

                                <div>

                                    <p className="text-xs text-zinc-500">

                                        Price

                                    </p>

                                    <h3
                                        className="
                                            text-2xl
                                            font-bold
                                            dark:text-white
                                        "
                                    >

                                        €{product.price || 0}

                                    </h3>

                                </div>


                                {/* STATUS */}

                                {product.is_active ? (

                                    <span
                                        className="
                                            px-3
                                            py-1
                                            rounded-full
                                            bg-green-100
                                            dark:bg-green-900/30
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
                                            dark:bg-red-900/30
                                            text-red-600
                                            text-sm
                                            font-medium
                                        "
                                    >

                                        Inactive

                                    </span>
                                )}

                            </div>

                        </div>

                    </Card>
                ))}

            </div>


            {/* MODAL */}

            <ProductModal
                isOpen={isModalOpen}

                onClose={() =>
                    setIsModalOpen(false)
                }
            />

        </div>
    )
}