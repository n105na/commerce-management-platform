import {
    useState,
} from 'react'

import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'

import {
    User,
    Phone,
    Wallet,
    Trash2,
    Pencil,
} from 'lucide-react'

import Card from '../components/ui/Card'

import Button from '../components/ui/Button'

import Input from '../components/ui/Input'

import Modal from '../components/ui/Modal'

import PageHeader from '../components/ui/PageHeader'

import CustomerModal from '../features/customers/CustomerModal'

import {

    getCustomers,
    deleteCustomer,

} from '../services/customerService'


export default function CustomersPage() {

    const queryClient =
        useQueryClient()


    const [search, setSearch] =
        useState('')


    const [

        isModalOpen,

        setIsModalOpen,

    ] = useState(false)


    const [

        customerToDelete,

        setCustomerToDelete,

    ] = useState(null)


    const [

        selectedCustomer,

        setSelectedCustomer,

    ] = useState(null)


    const {

        data,
        isLoading,

    } = useQuery({

        queryKey: ['customers'],

        queryFn: getCustomers,
    })


    /*
    =====================================
    DELETE
    =====================================
    */

    const deleteMutation =
        useMutation({

            mutationFn: deleteCustomer,

            onSuccess: () => {

                queryClient.invalidateQueries({

                    queryKey: ['customers'],
                })

                setCustomerToDelete(null)
            },
        })


    if (isLoading) {

        return (

            <div className="p-6">

                Loading customers...

            </div>
        )
    }


    const customers =
        data?.results || []


    const filteredCustomers =
        customers.filter(

            (customer) =>

                customer.full_name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        )


    function handleDelete() {

        if (!customerToDelete)
            return

        deleteMutation.mutate(
            customerToDelete.id
        )
    }


    return (

        <div className="space-y-8">

            {/* HEADER */}

            <PageHeader
                title="Customers"

                description="Manage buyers and track unpaid balances"

                action={

                    <Button
                        onClick={() => {

                            setSelectedCustomer(null)

                            setIsModalOpen(true)
                        }}
                    >

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
                                    className="
                                        text-zinc-700
                                        dark:text-zinc-300
                                    "
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

                                <span
                                    className="
                                        text-zinc-600
                                        dark:text-zinc-300
                                    "
                                >

                                    {customer.phone_number || 'No phone'}

                                </span>

                            </div>


                            {/* DEBT */}

                            <div className="flex items-center gap-3">

                                <Wallet
                                    size={18}
                                    className="text-red-500"
                                />

                                <span
                                    className="
                                        font-medium
                                        text-red-600
                                    "
                                >

                                    €
                                    {customer.unpaid_amount || 0}

                                </span>

                            </div>

                        </div>


                        {/* ACTIONS */}

                        <div className="mt-6 flex justify-end gap-2">

                            {/* EDIT */}

                            <Button
                                onClick={() => {

                                    setSelectedCustomer(customer)

                                    setIsModalOpen(true)
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
                                    setCustomerToDelete(
                                        customer
                                    )
                                }
                            >

                                <Trash2 size={16} />

                            </Button>

                        </div>

                    </Card>
                ))}

            </div>


            {/* CUSTOMER MODAL */}

            <CustomerModal
                isOpen={isModalOpen}

                onClose={() => {

                    setIsModalOpen(false)

                    setSelectedCustomer(null)
                }}

                customer={selectedCustomer}
            />


            {/* DELETE CONFIRMATION */}

            <Modal
                isOpen={!!customerToDelete}

                onClose={() =>
                    setCustomerToDelete(null)
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

                            Delete Customer

                        </h2>

                        <p className="text-zinc-500 mt-2">

                            Are you sure you want to delete

                            <span className="font-semibold">

                                {' '}
                                {customerToDelete?.full_name}
                            </span>

                            ?
                        </p>

                    </div>


                    <div className="flex gap-3">

                        <Button
                            className="w-full"

                            onClick={() =>
                                setCustomerToDelete(null)
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