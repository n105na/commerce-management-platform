import {
    useQuery,
} from '@tanstack/react-query'

import {
    DollarSign,
    Wallet,
    AlertTriangle,
    Boxes,
} from 'lucide-react'

import Card from '../components/ui/Card'

import PageHeader from '../components/ui/PageHeader'

import {
    getDashboardAnalytics,
} from '../services/dashboardService'


export default function DashboardPage() {

    const {

        data,
        isLoading,

    } = useQuery({

        queryKey: ['dashboard-analytics'],

        queryFn: getDashboardAnalytics,
    })


    if (isLoading) {

        return (

            <div className="p-6">

                Loading dashboard...

            </div>
        )
    }


    return (

        <div className="space-y-8">

            {/* HEADER */}

            <PageHeader
                title="Dashboard"

                description="Overview of your business performance"
            />


            {/* STATS */}

            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-4
                    gap-5
                "
            >

                {/* TOTAL SALES */}

                <Card className="p-6">

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-sm text-zinc-500">

                                Total Sales

                            </p>

                            <h2
                                className="
                                    mt-4
                                    text-4xl
                                    font-bold
                                    tracking-tight
                                    dark:text-white
                                "
                            >

                                €{data.total_sales}

                            </h2>

                        </div>


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

                            <DollarSign
                                size={22}
                                className="text-zinc-700 dark:text-zinc-300"
                            />

                        </div>

                    </div>

                </Card>


                {/* TOTAL PAID */}

                <Card className="p-6">

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-sm text-zinc-500">

                                Total Paid

                            </p>

                            <h2
                                className="
                                    mt-4
                                    text-4xl
                                    font-bold
                                    tracking-tight
                                    dark:text-white
                                "
                            >

                                €{data.total_paid}

                            </h2>

                        </div>


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

                            <Wallet
                                size={22}
                                className="text-zinc-700 dark:text-zinc-300"
                            />

                        </div>

                    </div>

                </Card>


                {/* UNPAID */}

                <Card className="p-6">

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-sm text-zinc-500">

                                Unpaid Amount

                            </p>

                            <h2
                                className="
                                    mt-4
                                    text-4xl
                                    font-bold
                                    tracking-tight
                                    text-red-600
                                "
                            >

                                €{data.total_unpaid}

                            </h2>

                        </div>


                        <div
                            className="
                                w-12
                                h-12
                                rounded-2xl
                                bg-red-100
                                dark:bg-red-900/30
                                flex
                                items-center
                                justify-center
                            "
                        >

                            <AlertTriangle
                                size={22}
                                className="text-red-500"
                            />

                        </div>

                    </div>

                </Card>


                {/* LOW STOCK */}

                <Card className="p-6">

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-sm text-zinc-500">

                                Low Stock Items

                            </p>

                            <h2
                                className="
                                    mt-4
                                    text-4xl
                                    font-bold
                                    tracking-tight
                                    text-yellow-600
                                "
                            >

                                {data.low_stock_items}

                            </h2>

                        </div>


                        <div
                            className="
                                w-12
                                h-12
                                rounded-2xl
                                bg-yellow-100
                                dark:bg-yellow-900/30
                                flex
                                items-center
                                justify-center
                            "
                        >

                            <Boxes
                                size={22}
                                className="text-yellow-500"
                            />

                        </div>

                    </div>

                </Card>

            </div>

        </div>
    )
}