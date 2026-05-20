import {
    useState,
} from 'react'

import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'

import {
    Pencil,
    Trash2,
} from 'lucide-react'

import Button from '../components/ui/Button'

import Input from '../components/ui/Input'

import Card from '../components/ui/Card'

import Modal from '../components/ui/Modal'

import PageHeader from '../components/ui/PageHeader'

import ProductModal from '../features/products/ProductModal'

import UpdatePriceModal from '../features/products/UpdatePriceModal'

import {

    getProducts,
    deleteProduct,

} from '../services/productService'


export default function ProductsPage() {

    const queryClient =
        useQueryClient()


    const [search, setSearch] =
        useState('')


    const [

        isModalOpen,

        setIsModalOpen,

    ] = useState(false)


    const [

        isPriceModalOpen,

        setIsPriceModalOpen,

    ] = useState(false)


    const [

        selectedProduct,

        setSelectedProduct,

    ] = useState(null)


    const [

        productToDelete,

        setProductToDelete,

    ] = useState(null)


    const {

        data,
        isLoading,

    } = useQuery({

        queryKey: ['products'],

        queryFn: getProducts,
    })


    /*
    =====================================
    DELETE
    =====================================
    */

    const deleteMutation =
        useMutation({

            mutationFn: deleteProduct,

            onSuccess: () => {

                queryClient.invalidateQueries({

                    queryKey: ['products'],
                })

                setProductToDelete(null)
            },
        })


    if (isLoading) {

        return (

            <div className="p-6">

                Loading products...

            </div>
        )
    }


    const products =
        data?.results || []


    const filteredProducts =
        products.filter(

            (product) =>

                product.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        )


    function handleDelete() {

        if (!productToDelete)
            return

        deleteMutation.mutate(
            productToDelete.id
        )
    }


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
                        setSearch(
                            e.target.value
                        )
                    }
                />

            </div>


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

                                        €{product.latest_price || 0}

                                    </h3>

                                </div>


                                {/* ACTIONS */}

                                <div className="flex items-center gap-2">

                                    {/* EDIT PRICE */}

                                    <Button
                                        onClick={() => {

                                            setSelectedProduct(product)

                                            setIsPriceModalOpen(true)
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
                                            setProductToDelete(product)
                                        }
                                    >

                                        <Trash2 size={16} />

                                    </Button>


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

                        </div>

                    </Card>
                ))}

            </div>


            {/* CREATE PRODUCT */}

            <ProductModal
                isOpen={isModalOpen}

                onClose={() =>
                    setIsModalOpen(false)
                }
            />


            {/* UPDATE PRICE */}

            <UpdatePriceModal
                isOpen={isPriceModalOpen}

                onClose={() =>
                    setIsPriceModalOpen(false)
                }

                product={selectedProduct}
            />


            {/* DELETE CONFIRMATION */}

            <Modal
                isOpen={!!productToDelete}

                onClose={() =>
                    setProductToDelete(null)
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

                            Delete Product

                        </h2>

                        <p className="text-zinc-500 mt-2">

                            Are you sure you want to delete

                            <span className="font-semibold">

                                {' '}
                                {productToDelete?.name}
                            </span>

                            ?
                        </p>

                    </div>


                    <div className="flex gap-3">

                        <Button
                            className="w-full"

                            onClick={() =>
                                setProductToDelete(null)
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