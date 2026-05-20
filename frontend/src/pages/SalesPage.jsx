import {
    useState,
} from 'react'

import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'

import {
    Search,
    ShoppingCart,
    Trash2,
    Ban,
} from 'lucide-react'

import {

    getOrders,
    cancelOrder,
    deleteOrder,

} from '../services/salesService'

import OrderStatusBadge from '../components/common/OrderStatusBadge'

import CreateOrderModal from '../features/sales/CreateOrderModal'

import Card from '../components/ui/Card'

import Button from '../components/ui/Button'

import Input from '../components/ui/Input'

import Modal from '../components/ui/Modal'

import PageHeader from '../components/ui/PageHeader'


export default function SalesPage() {

    const queryClient =
        useQueryClient()


    const [search, setSearch] =
        useState('')


    const [

        isModalOpen,

        setIsModalOpen,

    ] = useState(false)


    const [

        selectedOrder,

        setSelectedOrder,

    ] = useState(null)


    const [

        actionType,

        setActionType,

    ] = useState(null)


    const {

        data,
        isLoading,

    } = useQuery({

        queryKey: ['orders'],

        queryFn: getOrders,
    })


    /*
    =====================================
    CANCEL
    =====================================
    */

    const cancelMutation =
        useMutation({

            mutationFn: cancelOrder,

            onSuccess: () => {

                queryClient.invalidateQueries({

                    queryKey: ['orders'],
                })

                queryClient.invalidateQueries({

                    queryKey: ['inventory-items'],
                })

                setSelectedOrder(null)
            },
        })


    /*
    =====================================
    DELETE
    =====================================
    */

    const deleteMutation =
        useMutation({

            mutationFn: deleteOrder,

            onSuccess: () => {

                queryClient.invalidateQueries({

                    queryKey: ['orders'],
                })

                setSelectedOrder(null)
            },
        })


    if (isLoading) {

        return (

            <div className="p-6">

                Loading sales...

            </div>
        )
    }


    const orders =
        data?.results || []


    const filteredOrders =
        orders.filter(

            (order) =>

                order.customer_name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        )


    function handleConfirm() {

        if (!selectedOrder)
            return


        if (actionType === 'cancel') {

            cancelMutation.mutate(
                selectedOrder.id
            )
        }


        if (actionType === 'delete') {

            deleteMutation.mutate(
                selectedOrder.id
            )
        }
    }


    return (

        <div className="space-y-8">

            {/* HEADER */}

            <PageHeader
                title="Sales"

                description="Track orders and customer payments"

                action={

                    <Button
                        onClick={() =>
                            setIsModalOpen(true)
                        }
                    >

                        Create Order

                    </Button>
                }
            />


            {/* SEARCH */}

            <div className="max-w-md">

                <Input
                    type="text"

                    placeholder="Search customers..."

                    value={search}

                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

            </div>


            {/* TABLE */}

            <Card className="overflow-hidden">

                {/* HEADER */}

                <div
                    className="
                        p-6
                        border-b
                        border-zinc-200
                        dark:border-zinc-800
                        flex
                        items-center
                        gap-3
                    "
                >

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

                        <ShoppingCart
                            size={22}
                            className="
                                text-zinc-700
                                dark:text-zinc-300
                            "
                        />

                    </div>


                    <div>

                        <h2
                            className="
                                text-2xl
                                font-bold
                                dark:text-white
                            "
                        >

                            Orders

                        </h2>

                        <p className="text-zinc-500 mt-1">

                            Customer orders overview

                        </p>

                    </div>

                </div>


                {/* TABLE */}

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead
                            className="
                                bg-zinc-50
                                dark:bg-zinc-800
                                border-b
                                border-zinc-200
                                dark:border-zinc-700
                            "
                        >

                            <tr>

                                <th className="text-left p-4 dark:text-white">

                                    Order

                                </th>

                                <th className="text-left p-4 dark:text-white">

                                    Customer

                                </th>

                                <th className="text-left p-4 dark:text-white">

                                    Total

                                </th>

                                <th className="text-left p-4 dark:text-white">

                                    Paid

                                </th>

                                <th className="text-left p-4 dark:text-white">

                                    Remaining

                                </th>

                                <th className="text-left p-4 dark:text-white">

                                    Items

                                </th>

                                <th className="text-left p-4 dark:text-white">

                                    Status

                                </th>

                                <th className="text-left p-4 dark:text-white">

                                    Actions

                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredOrders.map((order) => (

                                <tr
                                    key={order.id}

                                    className="
                                        border-b
                                        border-zinc-100
                                        dark:border-zinc-800
                                        hover:bg-zinc-50
                                        dark:hover:bg-zinc-800/50
                                        transition
                                    "
                                >

                                    {/* ORDER */}

                                    <td
                                        className="
                                            p-4
                                            font-medium
                                            dark:text-white
                                        "
                                    >

                                        #{order.id}

                                    </td>


                                    {/* CUSTOMER */}

                                    <td
                                        className="
                                            p-4
                                            text-zinc-600
                                            dark:text-zinc-300
                                        "
                                    >

                                        {order.customer_name}

                                    </td>


                                    {/* TOTAL */}

                                    <td
                                        className="
                                            p-4
                                            font-medium
                                            dark:text-white
                                        "
                                    >

                                        €{order.total_amount}

                                    </td>


                                    {/* PAID */}

                                    <td
                                        className="
                                            p-4
                                            text-green-600
                                            font-medium
                                        "
                                    >

                                        €{order.paid_amount}

                                    </td>


                                    {/* REMAINING */}

                                    <td
                                        className="
                                            p-4
                                            text-red-600
                                            font-medium
                                        "
                                    >

                                        €{order.remaining_amount}

                                    </td>


                                    {/* ITEMS */}

                                    <td
                                        className="
                                            p-4
                                            text-zinc-600
                                            dark:text-zinc-300
                                        "
                                    >

                                        {
                                            order.items

                                                ? order.items.reduce(

                                                    (
                                                        total,
                                                        item
                                                    ) =>

                                                        total +

                                                        Number(
                                                            item.quantity
                                                        ),

                                                    0
                                                )

                                                : 0
                                        }

                                    </td>


                                    {/* STATUS */}

                                    <td className="p-4">

                                        <OrderStatusBadge
                                            status={order.status}
                                        />

                                    </td>


                                    {/* ACTIONS */}

                                    <td className="p-4">

                                        <div className="flex gap-2">

                                            {/* CANCEL */}

                                            <Button
                                                onClick={() => {

                                                    setSelectedOrder(order)

                                                    setActionType('cancel')
                                                }}
                                            >

                                                <Ban size={16} />

                                            </Button>


                                            {/* DELETE */}

                                            <Button
                                                className="
                                                    bg-red-600
                                                    hover:bg-red-700
                                                "

                                                onClick={() => {

                                                    setSelectedOrder(order)

                                                    setActionType('delete')
                                                }}
                                            >

                                                <Trash2 size={16} />

                                            </Button>

                                        </div>

                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </Card>


            {/* CREATE ORDER */}

            <CreateOrderModal
                isOpen={isModalOpen}

                onClose={() =>
                    setIsModalOpen(false)
                }
            />


            {/* CONFIRMATION MODAL */}

            <Modal
                isOpen={!!selectedOrder}

                onClose={() =>
                    setSelectedOrder(null)
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

                            {actionType === 'cancel'

                                ? 'Cancel Order'

                                : 'Delete Order'}

                        </h2>

                        <p className="text-zinc-500 mt-2">

                            Are you sure you want to

                            {' '}

                            {actionType}

                            {' '}

                            order #

                            {selectedOrder?.id}

                            ?
                        </p>

                    </div>


                    <div className="flex gap-3">

                        <Button
                            className="w-full"

                            onClick={() =>
                                setSelectedOrder(null)
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

                            onClick={handleConfirm}
                        >

                            Confirm

                        </Button>

                    </div>

                </div>

            </Modal>

        </div>
    )
}