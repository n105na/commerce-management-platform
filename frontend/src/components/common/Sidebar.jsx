import {
    LayoutDashboard,
    Package,
    Boxes,
    ShoppingCart,
    Users,
    Wallet,
    BarChart3,
    Settings,
    FolderKanban,
    X,
} from 'lucide-react'

import {
    NavLink,
} from 'react-router-dom'

import {
    useTranslation,
} from 'react-i18next'

import {
    useSidebar,
} from '../../contexts/SidebarContext'

import {
    useSettings,
} from '../../contexts/SettingsContext'


export default function Sidebar() {

    const { t } = useTranslation()

    const {
        settings,
    } = useSettings()

    const {

        isOpen,

        closeSidebar,

    } = useSidebar()


    const links = [

        {
            label: t('dashboard'),
            icon: LayoutDashboard,
            path: '/',
        },

        {
            label: t('products'),
            icon: Package,
            path: '/products',
        },

        {
            label: t('categories'),
            icon: FolderKanban,
            path: '/categories',
        },

        {
            label: t('inventory'),
            icon: Boxes,
            path: '/inventory',
        },

        {
            label: t('sales'),
            icon: ShoppingCart,
            path: '/sales',
        },

        {
            label: t('customers'),
            icon: Users,
            path: '/customers',
        },

        {
            label: t('finance'),
            icon: Wallet,
            path: '/finance',
        },

        {
            label: t('reports'),
            icon: BarChart3,
            path: '/reports',
        },

        {
            label: t('settings'),
            icon: Settings,
            path: '/settings',
        },
    ]


    return (

        <>

            {/* MOBILE OVERLAY */}

            {isOpen && (

                <div
                    onClick={closeSidebar}

                    className="
                        fixed
                        inset-0
                        bg-black/50
                        z-40
                        lg:hidden
                    "
                />
            )}


            {/* SIDEBAR */}

            <aside
                className={`
                    fixed
                    lg:static
                    inset-y-0
                    left-0
                    z-50
                    w-72
                    bg-white/80
                    dark:bg-zinc-900/80
                    backdrop-blur-xl
                    border-r
                    border-zinc-200
                    dark:border-zinc-800
                    p-5
                    transform
                    transition-transform
                    duration-300

                    ${isOpen
                        ? 'translate-x-0'
                        : '-translate-x-full lg:translate-x-0'
                    }
                `}
            >

                {/* MOBILE CLOSE */}

                <div className="flex items-center justify-between lg:hidden mb-6">

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                w-12
                                h-12
                                rounded-2xl
                                overflow-hidden
                                bg-zinc-100
                                dark:bg-zinc-800
                                flex
                                items-center
                                justify-center
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

                                <span
                                    className="
                                        text-xl
                                        font-bold
                                        dark:text-white
                                    "
                                >

                                    {settings?.store_name?.[0] || 'C'}

                                </span>
                            )}

                        </div>


                        <div>

                            <h1
                                className="
                                    text-xl
                                    font-bold
                                    dark:text-white
                                "
                            >

                                {settings?.store_name || 'CommerceOS'}

                            </h1>

                            <p className="text-xs text-zinc-500">

                                {t('business_platform')}

                            </p>

                        </div>

                    </div>


                    <button
                        onClick={closeSidebar}

                        className="dark:text-white"
                    >

                        <X />

                    </button>

                </div>


                {/* DESKTOP LOGO */}

                <div className="hidden lg:flex items-center gap-4 mb-10">

                    <div
                        className="
                            w-14
                            h-14
                            rounded-3xl
                            overflow-hidden
                            bg-zinc-100
                            dark:bg-zinc-800
                            flex
                            items-center
                            justify-center
                            shrink-0
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

                            <span
                                className="
                                    text-2xl
                                    font-bold
                                    dark:text-white
                                "
                            >

                                {settings?.store_name?.[0] || 'C'}

                            </span>
                        )}

                    </div>


                    <div>

                        <h1
                            className="
                                text-2xl
                                font-bold
                                dark:text-white
                            "
                        >

                            {settings?.store_name || 'CommerceOS'}

                        </h1>

                        <p className="text-sm text-zinc-500 mt-1">

                            {t('business_management_platform')}

                        </p>

                    </div>

                </div>


                {/* NAV */}

                <nav className="space-y-2">

                    {links.map((link) => {

                        const Icon = link.icon

                        return (

                            <NavLink
                                key={link.path}

                                to={link.path}

                                onClick={closeSidebar}

                                className={({ isActive }) =>
                                    `
                                    flex
                                    items-center
                                    gap-3
                                    px-4
                                    py-3
                                    rounded-2xl
                                    transition-all

                                    ${isActive

                                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-black'

                                        : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'
                                    }
                                    `
                                }
                            >

                                <Icon size={20} />

                                <span>

                                    {link.label}

                                </span>

                            </NavLink>
                        )
                    })}
                </nav>

            </aside>

        </>
    )
}