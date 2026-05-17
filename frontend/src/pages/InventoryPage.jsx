import {
    useState,
} from 'react'

import {
    useQuery,
} from '@tanstack/react-query'

import {
    Search,
    Boxes,
} from 'lucide-react'

import {
    getInventoryItems,
} from '../services/inventoryService'

import StockStatusBadge from '../components/common/StockStatusBadge'

import Card from '../components/ui/Card'

import Input from '../components/ui/Input'

import PageHeader from '../components/ui/PageHeader'


export default function InventoryPage() {

    const [search, setSearch] = useState('')


    const {

        data,
        isLoading,

    } = useQuery({

        queryKey: ['inventory-items'],

        queryFn: getInventoryItems,
    })


    if (isLoading) {

        return (

            <div className="p-6">

                Loading inventory...

            </div>
        )
    }


    const items = data?.results || []


    const filteredItems = items.filter(

        (item) =>

            item.product?.name
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
    )


    return (

        <div className="space-y-8">

            {/* HEADER */}

            <PageHeader
                title="Inventory"

                description="Track stock and inventory levels"
            />


            {/* SEARCH */}

            <div className="max-w-md">

                <Input
                    type="text"

                    placeholder="Search inventory..."

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

            </div>


            {/* TABLE */}

            <Card className="overflow-hidden">

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

                        <Boxes
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

                            Inventory Items

                        </h2>

                        <p className="text-zinc-500 mt-1">

                            Current stock overview

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

                                    Product

                                </th>

                                <th className="text-left p-4 dark:text-white">

                                    Quantity

                                </th>

                                <th className="text-left p-4 dark:text-white">

                                    Minimum

                                </th>

                                <th className="text-left p-4 dark:text-white">

                                    Status

                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredItems.map((item) => (

                                <tr
                                    key={item.id}

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

                                        {item.product?.name}

                                    </td>

                                    <td className="p-4 text-zinc-600 dark:text-zinc-300">

                                        {item.quantity}

                                    </td>

                                    <td className="p-4 text-zinc-600 dark:text-zinc-300">

                                        {item.minimum_quantity}

                                    </td>

                                    <td className="p-4">

                                        <StockStatusBadge
                                            status={item.stock_status}
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