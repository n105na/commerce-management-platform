import {
    useEffect,
    useState,
} from 'react'

import {
    useQuery,
    useMutation,
} from '@tanstack/react-query'

import {
    useTheme,
} from '../contexts/ThemeContext'

import {
    useLanguage,
} from '../contexts/LanguageContext'

import Card from '../components/ui/Card'

import Button from '../components/ui/Button'

import Input from '../components/ui/Input'

import PageHeader from '../components/ui/PageHeader'

import {

    getPlatformSettings,
    updatePlatformSettings,

} from '../services/settingsService'


export default function SettingsPage() {

    const {
        theme,
        toggleTheme,
    } = useTheme()


    const {
        language,
        changeLanguage,
    } = useLanguage()


    const [formData, setFormData] = useState({

        store_name: '',
        business_email: '',
        currency: 'EUR',
        timezone: 'Europe/Paris',
        logo: null,
    })


    const {

        data,
        refetch,

    } = useQuery({

        queryKey: ['platform-settings'],

        queryFn: getPlatformSettings,
    })


    useEffect(() => {

        if (data) {

            setFormData({

                store_name:
                    data.store_name || '',

                business_email:
                    data.business_email || '',

                currency:
                    data.currency || 'EUR',

                timezone:
                    data.timezone || 'Europe/Paris',

                logo: null,
            })
        }

    }, [data])


    const mutation = useMutation({

        mutationFn: updatePlatformSettings,

        onSuccess: () => {

            refetch()

            alert(
                'Settings updated successfully'
            )
        },
    })


    function handleChange(e) {

        const {

            name,
            value,
            files,
            type,

        } = e.target


        setFormData({

            ...formData,

            [name]:

                type === 'file'
                    ? files[0]
                    : value,
        })
    }


    function handleSubmit(e) {

        e.preventDefault()

        mutation.mutate(formData)
    }


    return (

        <div className="space-y-8">

            <PageHeader
                title="Settings"

                description="Customize your platform experience"
            />


            {/* APPEARANCE */}

            <Card className="p-6 space-y-6">

                <div>

                    <h2 className="text-2xl font-bold dark:text-white">

                        Appearance

                    </h2>

                </div>


                <Button
                    onClick={toggleTheme}
                >

                    {theme === 'dark'
                        ? 'Light Mode'
                        : 'Dark Mode'
                    }

                </Button>

            </Card>


            {/* LANGUAGE */}

            <Card className="p-6 space-y-6">

                <div>

                    <h2 className="text-2xl font-bold dark:text-white">

                        Language

                    </h2>

                </div>


                <select
                    value={language}

                    onChange={(e) =>
                        changeLanguage(
                            e.target.value
                        )
                    }

                    className="
                        w-full
                        border
                        border-zinc-200
                        dark:border-zinc-800
                        rounded-2xl
                        px-4
                        py-3
                        bg-white
                        dark:bg-zinc-900
                        dark:text-white
                    "
                >

                    <option value="en">
                        English
                    </option>

                    <option value="fr">
                        Français
                    </option>

                    <option value="ar">
                        العربية
                    </option>

                </select>

            </Card>


            {/* BUSINESS SETTINGS */}

            <Card className="p-6">

                <form
                    onSubmit={handleSubmit}

                    className="space-y-6"
                >

                    <div>

                        <h2 className="text-2xl font-bold dark:text-white">

                            Business Settings

                        </h2>

                    </div>


                    {/* STORE NAME */}

                    <div className="space-y-2">

                        <label className="dark:text-white">

                            Store Name

                        </label>

                        <Input
                            name="store_name"

                            value={formData.store_name}

                            onChange={handleChange}
                        />

                    </div>


                    {/* EMAIL */}

                    <div className="space-y-2">

                        <label className="dark:text-white">

                            Business Email

                        </label>

                        <Input
                            type="email"

                            name="business_email"

                            value={formData.business_email}

                            onChange={handleChange}
                        />

                    </div>


                    {/* CURRENCY */}

                    <div className="space-y-2">

                        <label className="dark:text-white">

                            Currency

                        </label>

                        <select
                            name="currency"

                            value={formData.currency}

                            onChange={handleChange}

                            className="
                                w-full
                                border
                                border-zinc-200
                                dark:border-zinc-800
                                rounded-2xl
                                px-4
                                py-3
                                bg-white
                                dark:bg-zinc-900
                                dark:text-white
                            "
                        >

                            <option value="EUR">

                                EUR (€)

                            </option>

                            <option value="USD">

                                USD ($)

                            </option>

                            <option value="DZD">

                                DZD (دج)

                            </option>

                        </select>

                    </div>


                    {/* TIMEZONE */}

                    <div className="space-y-2">

                        <label className="dark:text-white">

                            Timezone

                        </label>

                        <select
                            name="timezone"

                            value={formData.timezone}

                            onChange={handleChange}

                            className="
                                w-full
                                border
                                border-zinc-200
                                dark:border-zinc-800
                                rounded-2xl
                                px-4
                                py-3
                                bg-white
                                dark:bg-zinc-900
                                dark:text-white
                            "
                        >

                            <option value="Europe/Paris">

                                Europe/Paris

                            </option>

                            <option value="Africa/Algiers">

                                Africa/Algiers

                            </option>

                        </select>

                    </div>


                    {/* LOGO */}

                    <div className="space-y-2">

                        <label className="dark:text-white">

                            Store Logo

                        </label>

                        <input
                            type="file"

                            name="logo"

                            accept="image/*"

                            onChange={handleChange}

                            className="
                                w-full
                                border
                                border-zinc-200
                                dark:border-zinc-800
                                rounded-2xl
                                px-4
                                py-3
                                dark:text-white
                            "
                        />

                    </div>


                    <Button type="submit">

                        Save Settings

                    </Button>

                </form>

            </Card>

        </div>
    )
}