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
    createProductPrice,
} from '../../services/productPriceService'


export default function UpdatePriceModal({

    isOpen,
    onClose,
    product,

}) {

    const queryClient =
        useQueryClient()


    const [price, setPrice] =
        useState('')


    const mutation = useMutation({

        mutationFn: () =>

            createProductPrice({

                product: product.id,

                price,

                effective_date:
                    new Date()
                        .toISOString()
                        .split('T')[0],
            }),


        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ['products'],
            })

            queryClient.invalidateQueries({

                queryKey: ['product-prices'],
            })

            onClose()
        },
    })


    function handleSubmit(e) {

        e.preventDefault()

        mutation.mutate()
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

                <div>

                    <h2
                        className="
                            text-2xl
                            font-bold
                            dark:text-white
                        "
                    >

                        Update Price

                    </h2>

                    <p className="text-zinc-500 mt-2">

                        {product?.name}

                    </p>

                </div>


                <div className="space-y-2">

                    <label className="dark:text-white">

                        New Price

                    </label>

                    <Input
                        type="number"

                        step="0.01"

                        value={price}

                        onChange={(e) =>
                            setPrice(
                                e.target.value
                            )
                        }
                    />

                </div>


                <Button
                    type="submit"

                    className="w-full"
                >

                    Save New Price

                </Button>

            </form>

        </Modal>
    )
}