export default function Card({

    children,

    className = '',

}) {

    return (

        <div
            className={`
                bg-white/70
                dark:bg-zinc-900/70
                backdrop-blur-xl
                border
                border-zinc-200
                dark:border-zinc-800
                rounded-3xl
                shadow-sm

                ${className}
            `}
        >

            {children}

        </div>
    )
}