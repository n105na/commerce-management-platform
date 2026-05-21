import {
    useState,
} from 'react'

import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'

import Modal from '../../components/ui/Modal'

import Button from '../../components/ui/Button'

import Input from '../../components/ui/Input'

import {

    createExpense,

} from '../../services/financeService'


export default function ExpenseModal({

    isOpen,
    onClose,

}) {

    const queryClient =
        useQueryClient()


    const [formData,
        setFormData] =
        useState({

            title: '',

            amount: '',

            description: '',

            expense_date: '',
        })


    /*
    =====================================
    CREATE
    =====================================
    */

    const mutation =
        useMutation({

            mutationFn: createExpense,

            onSuccess: () => {

                queryClient.invalidateQueries({

                    queryKey: ['expenses'],
                })

                onClose()
            },
        })


    function handleSubmit(e) {

        e.preventDefault()

        mutation.mutate(formData)
    }


    return (

        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >

            <form
                onSubmit={handleSubmit}

                className="space-y-5"
            >

                {/* TITLE */}

                <div>

                    <h2
                        className="
                            text-3xl
                            font-bold
                            dark:text-white
                        "
                    >

                        Add Expense

                    </h2>

                </div>


                {/* TITLE */}

                <Input
                    type="text"

                    placeholder="Expense title"

                    value={formData.title}

                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            title:
                                e.target.value,
                        })
                    }
                />


                {/* AMOUNT */}

                <Input
                    type="number"

                    step="0.01"

                    placeholder="Amount"

                    value={formData.amount}

                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            amount:
                                e.target.value,
                        })
                    }
                />


                {/* DATE */}

                <Input
                    type="date"

                    value={
                        formData.expense_date
                    }

                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            expense_date:
                                e.target.value,
                        })
                    }
                />


                {/* DESCRIPTION */}

                <textarea
                    rows={4}

                    placeholder="Description"

                    value={
                        formData.description
                    }

                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            description:
                                e.target.value,
                        })
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

                    className="w-full"
                >

                    Save Expense

                </Button>

            </form>

        </Modal>
    )
}