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


export default function SettingsPage() {

    const {
        theme,
        toggleTheme,
    } = useTheme()


    const {
        language,
        changeLanguage,
    } = useLanguage()


    return (

        <div className="space-y-8">

            {/* HEADER */}

            <PageHeader
                title="Settings"

                description="Customize your platform experience"
            />


            {/* APPEARANCE */}

            <Card className="p-6 space-y-6">

                <div>

                    <h2
                        className="
                            text-2xl
                            font-bold
                            dark:text-white
                        "
                    >

                        Appearance

                    </h2>

                    <p className="text-zinc-500 mt-1">

                        Manage your application theme

                    </p>

                </div>


                <div
                    className="
                        flex
                        flex-col
                        md:flex-row
                        md:items-center
                        md:justify-between
                        gap-4
                    "
                >

                    <div>

                        <h3
                            className="
                                font-semibold
                                dark:text-white
                            "
                        >

                            Theme Mode

                        </h3>

                        <p className="text-zinc-500 text-sm mt-1">

                            Switch between dark and light mode

                        </p>

                    </div>


                    <Button
                        onClick={toggleTheme}
                    >

                        {theme === 'dark'
                            ? 'Light Mode'
                            : 'Dark Mode'
                        }

                    </Button>

                </div>

            </Card>


            {/* LANGUAGE */}

            <Card className="p-6 space-y-6">

                <div>

                    <h2
                        className="
                            text-2xl
                            font-bold
                            dark:text-white
                        "
                    >

                        Language

                    </h2>

                    <p className="text-zinc-500 mt-1">

                        Select your preferred language

                    </p>

                </div>


                <div className="max-w-sm">

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
                            outline-none
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

                </div>

            </Card>


            {/* BRANDING */}

            <Card className="p-6 space-y-6">

                <div>

                    <h2
                        className="
                            text-2xl
                            font-bold
                            dark:text-white
                        "
                    >

                        Branding

                    </h2>

                    <p className="text-zinc-500 mt-1">

                        Customize your business branding

                    </p>

                </div>


                <div
                    className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-4
                    "
                >

                    {/* STORE NAME */}

                    <div className="space-y-2">

                        <label
                            className="
                                text-sm
                                font-medium
                                dark:text-white
                            "
                        >

                            Store Name

                        </label>

                        <Input
                            type="text"

                            placeholder="Commerce Platform"
                        />

                    </div>


                    {/* EMAIL */}

                    <div className="space-y-2">

                        <label
                            className="
                                text-sm
                                font-medium
                                dark:text-white
                            "
                        >

                            Business Email

                        </label>

                        <Input
                            type="email"

                            placeholder="store@email.com"
                        />

                    </div>

                </div>


                <Button>

                    Save Branding

                </Button>

            </Card>


            {/* BUSINESS */}

            <Card className="p-6 space-y-6">

                <div>

                    <h2
                        className="
                            text-2xl
                            font-bold
                            dark:text-white
                        "
                    >

                        Business Settings

                    </h2>

                    <p className="text-zinc-500 mt-1">

                        Configure business-related settings

                    </p>

                </div>


                <div
                    className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-4
                    "
                >

                    {/* CURRENCY */}

                    <div className="space-y-2">

                        <label
                            className="
                                text-sm
                                font-medium
                                dark:text-white
                            "
                        >

                            Currency

                        </label>

                        <select
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
                                outline-none
                            "
                        >

                            <option>

                                EUR (€)

                            </option>

                            <option>

                                USD ($)

                            </option>

                            <option>

                                DZD (دج)

                            </option>

                        </select>

                    </div>


                    {/* TIMEZONE */}

                    <div className="space-y-2">

                        <label
                            className="
                                text-sm
                                font-medium
                                dark:text-white
                            "
                        >

                            Timezone

                        </label>

                        <select
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
                                outline-none
                            "
                        >

                            <option>

                                Europe/Paris

                            </option>

                            <option>

                                Africa/Algiers

                            </option>

                        </select>

                    </div>

                </div>


                <Button>

                    Save Settings

                </Button>

            </Card>

        </div>
    )
}