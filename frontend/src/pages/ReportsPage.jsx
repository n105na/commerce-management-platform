import {
    useQuery,
} from '@tanstack/react-query'

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from 'recharts'

import {
    BarChart3,
    TrendingUp,
    AlertTriangle,
    Wallet,
} from 'lucide-react'

import Card from '../components/ui/Card'

import PageHeader from '../components/ui/PageHeader'

import {
    getDashboardReports,
} from '../services/reportService'


export default function ReportsPage() {

    const {

        data,
        isLoading,

    } = useQuery({

        queryKey: ['reports'],

        queryFn: getDashboardReports,
    })


    if (isLoading) {

        return (

            <div className="p-6">

                Loading reports...

            </div>
        )
    }


    const chartData = [

        {
            name: 'Paid',
            value: Number(data.total_paid),
        },

        {
            name: 'Unpaid',
            value: Number(data.total_unpaid),
        },
    ]


    const COLORS = [
        '#16a34a',
        '#dc2626',
    ]


    return (

        <div className="space-y-8">

            {/* HEADER */}

            <PageHeader
                title="Reports & Analytics"

                description="Analyze your business performance"
            />


            {/* KPI GRID */}

            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-4
                    gap-6
                "
            >

                {/* SALES */}

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
                                    text-blue-600
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
                                bg-blue-100
                                dark:bg-blue-900/30
                                flex
                                items-center
                                justify-center
                            "
                        >

                            <TrendingUp
                                size={22}
                                className="text-blue-500"
                            />

                        </div>

                    </div>

                </Card>


                {/* PAID */}

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
                                    text-green-600
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
                                bg-green-100
                                dark:bg-green-900/30
                                flex
                                items-center
                                justify-center
                            "
                        >

                            <Wallet
                                size={22}
                                className="text-green-500"
                            />

                        </div>

                    </div>

                </Card>


                {/* UNPAID */}

                <Card className="p-6">

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-sm text-zinc-500">

                                Unpaid

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


                {/* STOCK */}

                <Card className="p-6">

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-sm text-zinc-500">

                                Low Stock

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

                            <BarChart3
                                size={22}
                                className="text-yellow-500"
                            />

                        </div>

                    </div>

                </Card>

            </div>


            {/* CHARTS */}

            <div
                className="
                    grid
                    grid-cols-1
                    xl:grid-cols-2
                    gap-6
                "
            >

                {/* PIE CHART */}

                <Card className="p-6">

                    <h2
                        className="
                            text-2xl
                            font-bold
                            mb-6
                            dark:text-white
                        "
                    >

                        Payments Overview

                    </h2>

                    <div className="h-80">

                        <ResponsiveContainer>

                            <PieChart>

                                <Pie
                                    data={chartData}

                                    dataKey="value"

                                    outerRadius={100}

                                    label
                                >

                                    {chartData.map(

                                        (entry, index) => (

                                            <Cell
                                                key={index}

                                                fill={
                                                    COLORS[index]
                                                }
                                            />
                                        )
                                    )}

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </Card>


                {/* INSIGHTS */}

                <Card className="p-6 space-y-6">

                    <h2
                        className="
                            text-2xl
                            font-bold
                            dark:text-white
                        "
                    >

                        Business Insights

                    </h2>


                    <div className="space-y-4">

                        <div
                            className="
                                p-4
                                rounded-2xl
                                bg-zinc-100
                                dark:bg-zinc-800
                            "
                        >

                            <p className="text-zinc-500 text-sm">

                                Unpaid Amount

                            </p>

                            <h3
                                className="
                                    text-2xl
                                    font-bold
                                    text-red-600
                                    mt-2
                                "
                            >

                                €{data.total_unpaid}

                            </h3>

                        </div>


                        <div
                            className="
                                p-4
                                rounded-2xl
                                bg-zinc-100
                                dark:bg-zinc-800
                            "
                        >

                            <p className="text-zinc-500 text-sm">

                                Low Stock Products

                            </p>

                            <h3
                                className="
                                    text-2xl
                                    font-bold
                                    text-yellow-600
                                    mt-2
                                "
                            >

                                {data.low_stock_items}

                            </h3>

                        </div>


                        <div
                            className="
                                p-4
                                rounded-2xl
                                bg-zinc-100
                                dark:bg-zinc-800
                            "
                        >

                            <p className="text-zinc-500 text-sm">

                                Total Expenses

                            </p>

                            <h3
                                className="
                                    text-2xl
                                    font-bold
                                    text-blue-600
                                    mt-2
                                "
                            >

                                €{data.total_expenses}

                            </h3>

                        </div>

                    </div>

                </Card>

            </div>

        </div>
    )
}