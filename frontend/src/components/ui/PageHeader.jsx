export default function PageHeader({

    title,

    description,

    action,

}) {

    return (

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>

                <h1 className="text-4xl font-bold tracking-tight dark:text-white">

                    {title}

                </h1>

                <p className="text-zinc-500 mt-2">

                    {description}

                </p>

            </div>

            {action && (

                <div>

                    {action}

                </div>
            )}

        </div>
    )
}