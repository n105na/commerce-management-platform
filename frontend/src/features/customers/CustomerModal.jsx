import {
    useState,
    useEffect,
} from 'react'

import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'

import Modal from '../../components/ui/Modal'

import Button from '../../components/ui/Button'

import Input from '../../components/ui/Input'

import {

    createCustomer,
    updateCustomer,

} from '../../services/customerService'


export default function CustomerModal({

    isOpen,
    onClose,

    customer = null,

}) {

    const queryClient =
        useQueryClient()


    const [formData,
        setFormData] =
        useState({

            full_name: '',

            phone_number: '',

            address: '',
        })


    /*
    =====================================
    PREFILL
    =====================================
    */

    useEffect(() => {

        if (customer) {

            setFormData({

                full_name:
                    customer.full_name || '',

                phone_number:
                    customer.phone_number || '',

                address:
                    customer.address || '',
            })

        } else {

            setFormData({

                full_name: '',

                phone_number: '',

                address: '',
            })
        }

    }, [customer])


    /*
    =====================================
    MUTATION
    =====================================
    */

    const mutation =
        useMutation({

            mutationFn: (data) => {

                if (customer) {

                    return updateCustomer(

                        customer.id,

                        data
                    )
                }

                return createCustomer(data)
            },


            onSuccess: () => {

                queryClient.invalidateQueries({

                    queryKey: ['customers'],
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

                        {
                            customer

                                ? 'Edit Customer'

                                : 'Add Customer'
                        }

                    </h2>

                </div>


                {/* NAME */}

                <Input
                    type="text"

                    placeholder="Full name"

                    value={formData.full_name}

                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            full_name:
                                e.target.value,
                        })
                    }
                />


                {/* PHONE */}

                <Input
                    type="text"

                    placeholder="Phone number"

                    value={formData.phone_number}

                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            phone_number:
                                e.target.value,
                        })
                    }
                />


                {/* ADDRESS */}

                <textarea
                    rows={4}

                    placeholder="Address"

                    value={formData.address}

                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            address:
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

                    {
                        customer

                            ? 'Update Customer'

                            : 'Create Customer'
                    }

                </Button>

            </form>

        </Modal>
    )
}