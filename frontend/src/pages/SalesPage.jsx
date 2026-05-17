import {
    useState,
} from 'react'

import {
    useQuery,
} from '@tanstack/react-query'

import {
    Search,
    ShoppingCart,
} from 'lucide-react'

import {
    getOrders,
} from '../services/salesService'

import OrderStatusBadge from '../components/common/OrderStatusBadge'

import Card from '../components/ui/Card'

import Button from '../components/ui/Button'

import Input from '../components/ui/Input'

import PageHeader from '../components/ui/PageHeader'


export default function SalesPage() {

    const [search, setSearch] = useState('')


    const {

        data,
        isLoading,

    } = useQuery({

        queryKey: ['orders'],

        queryFn: getOrders,
    })


    if (isLoading) {

        return (

            <div className="p-6">

                Loading sales...

            </div>
        )
    }


    const orders = data?.results || []


    const filteredOrders = orders.filter(

        (order) =>

            order.customer?.full_name
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
    )


    return (

        <div className="space-y-8">

            {/* HEADER */}

            <PageHeader
                title="Sales"

                description="Track orders and customer payments"

                action={

                    <Button>

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
                        setSearch(e.target.value)
                    }
                />

            </div>


            {/* TABLE */}

            <Card className="overflow-hidden">

                {/* TABLE HEADER */}

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
                            className="text-zinc-700 dark:text-zinc-300"
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

                                    Status

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

                                    <td className="p-4 font-medium dark:text-white">

                                        #{order.id}

                                    </td>

                                    <td className="p-4 text-zinc-600 dark:text-zinc-300">

                                        {order.customer.full_name}

                                    </td>

                                    <td className="p-4 text-zinc-600 dark:text-zinc-300">

                                        €{order.total_amount}

                                    </td>

                                    <td className="p-4 text-green-600 font-medium">

                                        €{order.paid_amount}

                                    </td>

                                    <td className="p-4 text-red-600 font-medium">

                                        €{order.remaining_amount}

                                    </td>

                                    <td className="p-4">

                                        <OrderStatusBadge
                                            status={order.status}
                                        />

                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </Card>

        </div>
    )
}