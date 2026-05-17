export default function StockStatusBadge({

    status,

}) {

    const styles = {

        IN_STOCK:
            'bg-green-100 text-green-700',

        LOW_STOCK:
            'bg-yellow-100 text-yellow-700',

        OUT_OF_STOCK:
            'bg-red-100 text-red-700',
    }


    return (

        <span
            className={`
                px-3 py-1 rounded-full text-sm font-medium

                ${styles[status]}
            `}
        >

            {status?.replaceAll('_', ' ')}

        </span>
    )
}