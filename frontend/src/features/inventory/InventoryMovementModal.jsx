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

    createStockMovement,

} from '../../services/inventoryService'


export default function InventoryMovementModal({

    isOpen,
    onClose,

    item,

}) {

    const queryClient =
        useQueryClient()


    const [formData,
        setFormData] =
        useState({

            movement_type: 'IN',

            quantity: '',

            notes: '',
        })


    /*
    =====================================
    CREATE MOVEMENT
    =====================================
    */

    const mutation =
        useMutation({

            mutationFn: createStockMovement,

            onSuccess: () => {

                queryClient.invalidateQueries({

                    queryKey: [
                        'inventory-items'
                    ],
                })

                queryClient.invalidateQueries({

                    queryKey: [
                        'stock-movements'
                    ],
                })

                onClose()
            },
        })


    function handleSubmit(e) {

        e.preventDefault()

        mutation.mutate({

            product:
                item.product.id,

            movement_type:
                formData.movement_type,

            quantity:
                formData.quantity,

            notes:
                formData.notes,
        })
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

                        Stock Movement

                    </h2>

                    <p className="text-zinc-500 mt-1">

                        {item?.product?.name}

                    </p>

                </div>


                {/* TYPE */}

                <select
                    value={
                        formData.movement_type
                    }

                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            movement_type:
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
                >

                    <option value="IN">

                        Stock In

                    </option>

                    <option value="OUT">

                        Stock Out

                    </option>

                    <option value="ADJUSTMENT">

                        Adjustment

                    </option>

                </select>


                {/* QUANTITY */}

                <Input
                    type="number"

                    placeholder="Quantity"

                    value={formData.quantity}

                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            quantity:
                                e.target.value,
                        })
                    }
                />


                {/* NOTES */}

                <textarea
                    rows={4}

                    placeholder="Notes"

                    value={formData.notes}

                    onChange={(e) =>
                        setFormData({

                            ...formData,

                            notes:
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

                    Save Movement

                </Button>

            </form>

        </Modal>
    )
}