import {
    useState,
} from 'react'

import {
    useQuery,
} from '@tanstack/react-query'

import {
    Search,
    User,
    Phone,
    Wallet,
} from 'lucide-react'

import Card from '../components/ui/Card'

import Button from '../components/ui/Button'

import Input from '../components/ui/Input'

import PageHeader from '../components/ui/PageHeader'

import {
    getCustomers,
} from '../services/customerService'


export default function CustomersPage() {

    const [search, setSearch] = useState('')


    const {

        data,
        isLoading,

    } = useQuery({

        queryKey: ['customers'],

        queryFn: getCustomers,
    })


    if (isLoading) {

        return (

            <div className="p-6">

                Loading customers...

            </div>
        )
    }


    const customers = data?.results || []


    const filteredCustomers = customers.filter(

        (customer) =>

            customer.full_name
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
    )


    return (

        <div className="space-y-8">

            {/* HEADER */}

            <PageHeader
                title="Customers"

                description="Manage buyers and track unpaid balances"

                action={

                    <Button>

                        Add Customer

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

                {filteredCustomers.map((customer) => (

                    <Card
                        key={customer.id}

                        className="p-6"
                    >

                        {/* TOP */}

                        <div className="flex items-start justify-between">

                            <div>

                                <h2
                                    className="
                                        text-xl
                                        font-bold
                                        dark:text-white
                                    "
                                >

                                    {customer.full_name}

                                </h2>

                                <p className="text-zinc-500 mt-1">

                                    Customer account

                                </p>

                            </div>


                            {/* AVATAR */}

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

                                <User
                                    size={22}
                                    className="text-zinc-700 dark:text-zinc-300"
                                />

                            </div>

                        </div>


                        {/* INFO */}

                        <div className="mt-6 space-y-4">

                            {/* PHONE */}

                            <div className="flex items-center gap-3">

                                <Phone
                                    size={18}
                                    className="text-zinc-400"
                                />

                                <span className="text-zinc-600 dark:text-zinc-300">

                                    {customer.phone_number || 'No phone'}

                                </span>

                            </div>


                            {/* DEBT */}

                            <div className="flex items-center gap-3">

                                <Wallet
                                    size={18}
                                    className="text-red-500"
                                />

                                <span className="font-medium text-red-600">

                                    €{customer.unpaid_amount || 0}

                                </span>

                            </div>

                        </div>

                    </Card>
                ))}

            </div>

        </div>
    )
}