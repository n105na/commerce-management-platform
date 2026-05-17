export default function Modal({

    isOpen,
    onClose,
    children,

}) {

    if (!isOpen) return null


    return (

        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/50
                p-4
            "
        >

            {/* BACKDROP */}

            <div
                className="absolute inset-0"

                onClick={onClose}
            />


            {/* MODAL */}

            <div
                className="
                    relative
                    w-full
                    max-w-2xl
                    max-h-[90vh]
                    overflow-y-auto
                    rounded-3xl
                    border
                    border-zinc-200
                    dark:border-zinc-800
                    bg-white
                    dark:bg-zinc-900
                    shadow-2xl
                    p-6
                "
            >

                {children}

            </div>

        </div>
    )
}