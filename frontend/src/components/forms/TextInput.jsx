export default function TextInput({

    label,

    value,

    onChange,

    placeholder,

    type = 'text',

}) {

    return (

        <div className="space-y-2">

            <label className="text-sm font-medium dark:text-white">

                {label}

            </label>

            <input
                type={type}

                value={value}

                onChange={onChange}

                placeholder={placeholder}

                className="
                    w-full
                    border
                    rounded-xl
                    px-4
                    py-3
                    bg-white
                    dark:bg-gray-800
                    dark:text-white
                    dark:border-gray-700
                "
            />

        </div>
    )
}