import {
    useTranslation,
} from 'react-i18next'

import {
    Menu,
    LogOut,
} from 'lucide-react'

import {
    useAuth,
} from '../../contexts/AuthContext'

import {
    useTheme,
} from '../../contexts/ThemeContext'

import {
    useLanguage,
} from '../../contexts/LanguageContext'

import {
    useSidebar,
} from '../../contexts/SidebarContext'


export default function Topbar() {

    const { t } = useTranslation()

    const {
        user,
        logout,
    } = useAuth()

    const {
        theme,
        toggleTheme,
    } = useTheme()

    const {
        language,
        changeLanguage,
    } = useLanguage()

    const {
        toggleSidebar,
    } = useSidebar()


    return (

        <header
            className="
                sticky
                top-0
                z-30
                h-20
                px-4
                lg:px-8
                flex
                items-center
                justify-between
                border-b
                border-zinc-200
                dark:border-zinc-800
                bg-white/70
                dark:bg-zinc-900/70
                backdrop-blur-xl
            "
        >

            {/* LEFT */}

            <div className="flex items-center gap-4">

                {/* MOBILE MENU */}

                <button
                    onClick={toggleSidebar}

                    className="
                        lg:hidden
                        p-2.5
                        rounded-2xl
                        bg-zinc-100
                        hover:bg-zinc-200
                        dark:bg-zinc-800
                        dark:hover:bg-zinc-700
                        transition
                    "
                >

                    <Menu
                        size={20}
                        className="dark:text-white"
                    />

                </button>


                {/* TITLE */}

                <div>

                    <h2 className="text-xl font-bold dark:text-white">

                        Welcome back 👋

                    </h2>

                    <p className="text-sm text-zinc-500">

                        Manage your business efficiently

                    </p>

                </div>

            </div>


            {/* RIGHT */}

            <div className="flex items-center gap-2 lg:gap-3">

                {/* LANGUAGE */}

                <select
                    value={language}

                    onChange={(e) =>
                        changeLanguage(
                            e.target.value
                        )
                    }

                    className="
                        border
                        border-zinc-200
                        dark:border-zinc-700
                        rounded-2xl
                        px-3
                        py-2.5
                        bg-white
                        dark:bg-zinc-800
                        dark:text-white
                        outline-none
                    "
                >

                    <option value="en">
                        EN
                    </option>

                    <option value="fr">
                        FR
                    </option>

                    <option value="ar">
                        AR
                    </option>

                </select>


                {/* THEME */}

                <button
                    onClick={toggleTheme}

                    className="
                        h-11
                        w-11
                        rounded-2xl
                        bg-zinc-100
                        hover:bg-zinc-200
                        dark:bg-zinc-800
                        dark:hover:bg-zinc-700
                        transition
                        flex
                        items-center
                        justify-center
                        text-lg
                    "
                >

                    {theme === 'dark'
                        ? '☀️'
                        : '🌙'
                    }

                </button>


                {/* USER CARD */}

                <div
                    className="
                        hidden
                        md:flex
                        items-center
                        gap-3
                        bg-white
                        dark:bg-zinc-800
                        border
                        border-zinc-200
                        dark:border-zinc-700
                        rounded-2xl
                        px-3
                        py-2
                    "
                >

                    {/* AVATAR */}

                    <div
                        className="
                            w-10
                            h-10
                            rounded-full
                            bg-zinc-900
                            dark:bg-white
                            dark:text-black
                            text-white
                            flex
                            items-center
                            justify-center
                            font-semibold
                        "
                    >

                        {user?.username?.[0]?.toUpperCase()}

                    </div>


                    {/* USER INFO */}

                    <div>

                        <p className="font-medium dark:text-white">

                            {user?.username}

                        </p>

                        <p className="text-xs text-zinc-500">

                            Administrator

                        </p>

                    </div>

                </div>


                {/* LOGOUT */}

                <button
                    onClick={logout}

                    className="
                        flex
                        items-center
                        gap-2
                        px-4
                        py-2.5
                        rounded-2xl
                        bg-zinc-900
                        hover:bg-zinc-800
                        dark:bg-white
                        dark:text-black
                        dark:hover:bg-zinc-200
                        text-white
                        transition
                    "
                >

                    <LogOut size={16} />

                    <span className="hidden lg:block">

                        {t('logout')}

                    </span>

                </button>

            </div>

        </header>
    )
}