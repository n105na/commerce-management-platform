export default function Button({

    children,

    variant = 'primary',

    className = '',

    ...props

}) {

    const variants = {

        primary:
            `
            bg-zinc-900
            hover:bg-zinc-800
            text-white
            dark:bg-white
            dark:text-black
            dark:hover:bg-zinc-200
            `,

        secondary:
            `
            bg-zinc-100
            hover:bg-zinc-200
            text-zinc-900
            dark:bg-zinc-800
            dark:text-white
            dark:hover:bg-zinc-700
            `,
    }


    return (

        <button
            className={`
                px-5
                py-3
                rounded-2xl
                transition-all
                duration-200
                font-medium
                shadow-sm

                ${variants[variant]}
                ${className}
            `}

            {...props}
        >

            {children}

        </button>
    )
}