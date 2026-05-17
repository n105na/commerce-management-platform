export default function Input({

    className = '',

    ...props

}) {

    return (

        <input
            className={`
                w-full
                px-4
                py-3
                rounded-2xl
                border
                border-zinc-200
                dark:border-zinc-800
                bg-white
                dark:bg-zinc-900
                dark:text-white
                outline-none
                focus:ring-2
                focus:ring-zinc-300
                dark:focus:ring-zinc-700
                transition

                ${className}
            `}

            {...props}
        />
    )
}