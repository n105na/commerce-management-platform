import {
    useState,
} from 'react'

import {
    Trash2,
    Plus,
    Minus,
} from 'lucide-react'

import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'

import Modal from '../../components/ui/Modal'

import Button from '../../components/ui/Button'

import Input from '../../components/ui/Input'

import {
    getCustomers,
} from '../../services/customerService'

import {
    getProducts,
} from '../../services/productService'

import {
    createOrder,
    createOrderItem,
} from '../../services/salesService'


export default function CreateOrderModal({

    isOpen,
    onClose,

}) {

    const queryClient =
        useQueryClient()


    const [customerId,
        setCustomerId] =
        useState('')

    const [paidAmount,
        setPaidAmount] =
        useState('0')

    const [notes,
        setNotes] =
        useState('')

    const [cart,
        setCart] =
        useState([])

    const [selectedProduct,
        setSelectedProduct] =
        useState('')

    const [quantity,
        setQuantity] =
        useState(1)


    const {

        data: customersData,

    } = useQuery({

        queryKey: ['customers'],

        queryFn: getCustomers,
    })


    const {

        data: productsData,

    } = useQuery({

        queryKey: ['products'],

        queryFn: getProducts,
    })


    const customers =
        customersData?.results || []

    const products =
        productsData?.results || []


    /*
    =====================================
    ADD PRODUCT
    =====================================
    */

    function addToCart() {

        const product =
            products.find(

                (p) =>

                    p.id === Number(
                        selectedProduct
                    )
            )

        if (!product) return


        const existing =
            cart.find(

                (item) =>

                    item.product_id ===
                    product.id
            )


        if (existing) {

            setCart(

                cart.map((item) =>

                    item.product_id ===
                    product.id

                        ? {

                            ...item,

                            quantity:

                                item.quantity +

                                Number(quantity),
                        }

                        : item
                )
            )

            return
        }


        setCart([

            ...cart,

            {
                product_id:
                    product.id,

                name:
                    product.name,

                quantity:
                    Number(quantity),

                price:
                    Number(
                        product.latest_price || 0
                    ),
            },
        ])
    }


    /*
    =====================================
    REMOVE ITEM
    =====================================
    */

    function removeItem(productId) {

        setCart(

            cart.filter(

                (item) =>

                    item.product_id !==
                    productId
            )
        )
    }


    /*
    =====================================
    UPDATE QUANTITY
    =====================================
    */

    function increaseQuantity(productId) {

        setCart(

            cart.map((item) =>

                item.product_id === productId

                    ? {

                        ...item,

                        quantity:
                            item.quantity + 1,
                    }

                    : item
            )
        )
    }


    function decreaseQuantity(productId) {

        setCart(

            cart.map((item) =>

                item.product_id === productId

                    ? {

                        ...item,

                        quantity:

                            Math.max(
                                1,
                                item.quantity - 1
                            ),
                    }

                    : item
            )
        )
    }


    /*
    =====================================
    TOTAL
    =====================================
    */

    const total =
        cart.reduce(

            (acc, item) =>

                acc +
                item.price *
                item.quantity,

            0
        )


    /*
    =====================================
    CREATE ORDER
    =====================================
    */

    const mutation =
        useMutation({

            mutationFn: async () => {

                const order =
                    await createOrder({

                        customer_id:
                            customerId,

                        total_amount:
                            total,

                        paid_amount:
                            paidAmount,

                        notes,
                    })


                for (const item of cart) {

                    await createOrderItem({

                        order_id:
                            order.id,

                        product_id:
                            item.product_id,

                        quantity:
                            item.quantity,
                    })
                }


                return order
            },


            onSuccess: async () => {

                await queryClient.invalidateQueries({

                    queryKey: ['orders'],
                })

                await queryClient.invalidateQueries({

                    queryKey: ['inventory-items'],
                })

                await queryClient.invalidateQueries({

                    queryKey: ['dashboard-analytics'],
                })


                setCart([])

                setCustomerId('')

                setPaidAmount('0')

                setNotes('')


                onClose()
            },
        })


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

                        Create Order

                    </h2>

                </div>


                {/* CUSTOMER */}

                <select
                    value={customerId}

                    onChange={(e) =>
                        setCustomerId(
                            e.target.value
                        )
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

                    <option value="">

                        Select customer

                    </option>

                    {customers.map((customer) => (

                        <option
                            key={customer.id}

                            value={customer.id}
                        >

                            {customer.full_name}

                        </option>
                    ))}

                </select>


                {/* PRODUCT */}

                <select
                    value={selectedProduct}

                    onChange={(e) =>
                        setSelectedProduct(
                            e.target.value
                        )
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

                    <option value="">

                        Select product

                    </option>

                    {products.map((product) => (

                        <option
                            key={product.id}

                            value={product.id}
                        >

                            {product.name}

                        </option>
                    ))}

                </select>


                {/* QUANTITY */}

                <Input
                    type="number"

                    value={quantity}

                    onChange={(e) =>
                        setQuantity(
                            e.target.value
                        )
                    }
                />


                {/* ADD */}

                <Button
                    type="button"

                    onClick={addToCart}

                    className="w-full"
                >

                    Add Product

                </Button>


                {/* CART */}

                <div className="space-y-3">

                    {cart.map((item) => (

                        <div
                            key={item.product_id}

                            className="
                                flex
                                items-center
                                justify-between
                                p-4
                                rounded-2xl
                                bg-zinc-100
                                dark:bg-zinc-800
                            "
                        >

                            {/* LEFT */}

                            <div>

                                <p className="dark:text-white font-medium">

                                    {item.name}

                                </p>

                                <p className="text-sm text-zinc-500">

                                    €{item.price}
                                    each

                                </p>

                            </div>


                            {/* RIGHT */}

                            <div className="flex items-center gap-3">

                                {/* QUANTITY */}

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >

                                    <button
                                        type="button"

                                        onClick={() =>
                                            decreaseQuantity(
                                                item.product_id
                                            )
                                        }
                                    >

                                        <Minus size={16} />

                                    </button>


                                    <span className="dark:text-white min-w-[20px] text-center">

                                        {item.quantity}

                                    </span>


                                    <button
                                        type="button"

                                        onClick={() =>
                                            increaseQuantity(
                                                item.product_id
                                            )
                                        }
                                    >

                                        <Plus size={16} />

                                    </button>

                                </div>


                                {/* SUBTOTAL */}

                                <p
                                    className="
                                        font-bold
                                        dark:text-white
                                        w-20
                                        text-right
                                    "
                                >

                                    €
                                    {(
                                        item.quantity *
                                        item.price
                                    ).toFixed(2)}

                                </p>


                                {/* DELETE */}

                                <button
                                    type="button"

                                    onClick={() =>
                                        removeItem(
                                            item.product_id
                                        )
                                    }

                                    className="text-red-500"
                                >

                                    <Trash2 size={18} />

                                </button>

                            </div>

                        </div>
                    ))}

                </div>


                {/* TOTAL */}

                <div
                    className="
                        flex
                        justify-between
                        items-center
                    "
                >

                    <h3
                        className="
                            text-xl
                            font-bold
                            dark:text-white
                        "
                    >

                        Total

                    </h3>

                    <h3
                        className="
                            text-2xl
                            font-bold
                            dark:text-white
                        "
                    >

                        €{total.toFixed(2)}

                    </h3>

                </div>


                {/* PAID */}

                <Input
                    type="number"

                    placeholder="Paid amount"

                    value={paidAmount}

                    onChange={(e) =>
                        setPaidAmount(
                            e.target.value
                        )
                    }
                />


                {/* NOTES */}

                <textarea
                    rows={3}

                    placeholder="Notes"

                    value={notes}

                    onChange={(e) =>
                        setNotes(
                            e.target.value
                        )
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
                />


                {/* SUBMIT */}

                <Button
                    type="submit"

                    disabled={
                        mutation.isPending
                    }

                    className="w-full"
                >

                    {mutation.isPending
                        ? 'Creating Order...'
                        : 'Create Order'
                    }

                </Button>

            </form>

        </Modal>
    )
}