import {
    useState,
} from 'react'

import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'

import {
    Pencil,
    Trash2,
} from 'lucide-react'

import Card from '../components/ui/Card'

import Button from '../components/ui/Button'

import PageHeader from '../components/ui/PageHeader'

import Modal from '../components/ui/Modal'

import CategoryModal from '../features/categories/CategoryModal'

import {

    getCategories,
    deleteCategory,

} from '../services/categoryService'


export default function CategoriesPage() {

    const queryClient =
        useQueryClient()


    const [isOpen, setIsOpen] =
        useState(false)

    const [selectedCategory,
        setSelectedCategory] =
        useState(null)

    const [

        categoryToDelete,

        setCategoryToDelete,

    ] = useState(null)


    const {

        data,

    } = useQuery({

        queryKey: ['categories'],

        queryFn: getCategories,
    })


    const categories =
        data?.results || []


    const deleteMutation =
        useMutation({

            mutationFn: deleteCategory,

            onSuccess: () => {

                queryClient.invalidateQueries({

                    queryKey: ['categories'],
                })

                setCategoryToDelete(null)
            },
        })


    function handleDelete() {

        if (!categoryToDelete)
            return

        deleteMutation.mutate(
            categoryToDelete.id
        )
    }


    return (

        <div className="space-y-8">

            <PageHeader
                title="Categories"

                description="Manage product categories"

                action={

                    <Button
                        onClick={() => {

                            setSelectedCategory(null)

                            setIsOpen(true)
                        }}
                    >

                        Add Category

                    </Button>
                }
            />


            <div className="grid gap-6">

                {categories.map((category) => (

                    <Card
                        key={category.id}

                        className="
                            p-6
                            flex
                            items-center
                            justify-between
                        "
                    >

                        <div>

                            <h2
                                className="
                                    text-xl
                                    font-bold
                                    dark:text-white
                                "
                            >

                                {category.name}

                            </h2>

                        </div>


                        <div className="flex gap-3">

                            {/* EDIT */}

                            <Button
                                onClick={() => {

                                    setSelectedCategory(category)

                                    setIsOpen(true)
                                }}
                            >

                                <Pencil size={16} />

                            </Button>


                            {/* DELETE */}

                            <Button
                                onClick={() =>

                                    setCategoryToDelete(
                                        category
                                    )
                                }
                            >

                                <Trash2 size={16} />

                            </Button>

                        </div>

                    </Card>
                ))}

            </div>


            {/* CATEGORY MODAL */}

            <CategoryModal
                isOpen={isOpen}

                onClose={() =>
                    setIsOpen(false)
                }

                category={selectedCategory}
            />


            {/* DELETE CONFIRMATION */}

            <Modal
                isOpen={
                    !!categoryToDelete
                }

                onClose={() =>
                    setCategoryToDelete(null)
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

                            Delete Category

                        </h2>

                        <p className="text-zinc-500 mt-2">

                            Are you sure you want
                            to delete:

                            <span className="font-semibold">

                                {' '}
                                {categoryToDelete?.name}
                            </span>

                            ?
                        </p>

                    </div>


                    <div className="flex gap-3">

                        <Button
                            className="w-full"

                            onClick={() =>
                                setCategoryToDelete(null)
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