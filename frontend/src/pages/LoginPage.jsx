import {
    useState,
} from 'react'

import {
    useNavigate,
} from 'react-router-dom'

import {
    ShoppingBag,
} from 'lucide-react'

import {
    useAuth,
} from '../contexts/AuthContext'

import {
    useSettings,
} from '../contexts/SettingsContext'

import Card from '../components/ui/Card'

import Button from '../components/ui/Button'

import Input from '../components/ui/Input'


export default function LoginPage() {

    const navigate = useNavigate()

    const { login } = useAuth()

    const {
        settings,
    } = useSettings()


    const [formData, setFormData] = useState({

        username: '',
        password: '',
    })


    const [error, setError] = useState('')


    async function handleSubmit(e) {

        e.preventDefault()

        try {

            setError('')

            await login(
                formData.username,
                formData.password
            )

            const currentUser =
    JSON.parse(

        localStorage.getItem(
            'current_user'
        )
    )


if (
    currentUser?.role ===
    'CUSTOMER'
) {

    navigate('/customer')

} else {

    navigate('/')
}

        } catch {

            setError(
                'Invalid credentials'
            )
        }
    }


    return (

        <div
            className="
                min-h-screen
                flex
                items-center
                justify-center
                px-4
                bg-zinc-50
                dark:bg-zinc-950
            "
        >

            <Card
                className="
                    w-full
                    max-w-md
                    p-8
                "
            >

                {/* LOGO */}

                <div className="flex flex-col items-center text-center mb-8">

                    <div
                        className="
                            w-20
                            h-20
                            rounded-3xl
                            overflow-hidden
                            bg-zinc-100
                            dark:bg-zinc-800
                            flex
                            items-center
                            justify-center
                            mb-5
                        "
                    >

                        {settings?.logo ? (

                            <img
                                src={settings.logo}

                                alt="Store Logo"

                                className="
                                    w-full
                                    h-full
                                    object-cover
                                "
                            />

                        ) : (

                            <ShoppingBag
                                className="
                                    text-zinc-700
                                    dark:text-white
                                "
                                size={32}
                            />
                        )}

                    </div>


                    <h1
                        className="
                            text-4xl
                            font-bold
                            tracking-tight
                            dark:text-white
                        "
                    >

                        {settings?.store_name || 'CommerceOS'}

                    </h1>

                    <p className="text-zinc-500 mt-2">

                        Sign in to manage your business

                    </p>

                </div>


                {/* ERROR */}

                {error && (

                    <div
                        className="
                            mb-6
                            p-4
                            rounded-2xl
                            bg-red-100
                            dark:bg-red-900/30
                            text-red-600
                        "
                    >

                        {error}

                    </div>
                )}


                {/* FORM */}

                <form
                    onSubmit={handleSubmit}

                    className="space-y-5"
                >

                    {/* USERNAME */}

                    <div className="space-y-2">

                        <label
                            className="
                                text-sm
                                font-medium
                                dark:text-white
                            "
                        >

                            Username

                        </label>

                        <Input
                            type="text"

                            placeholder="Enter username"

                            value={formData.username}

                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    username: e.target.value,
                                })
                            }
                        />

                    </div>


                    {/* PASSWORD */}

                    <div className="space-y-2">

                        <label
                            className="
                                text-sm
                                font-medium
                                dark:text-white
                            "
                        >

                            Password

                        </label>

                        <Input
                            type="password"

                            placeholder="Enter password"

                            value={formData.password}

                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                        />

                    </div>


                    {/* SUBMIT */}

                    <Button
                        type="submit"

                        className="w-full"
                    >

                        Login

                    </Button>

                </form>

            </Card>

        </div>
    )
}