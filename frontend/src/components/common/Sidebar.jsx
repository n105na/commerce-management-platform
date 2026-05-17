import {
    LayoutDashboard,
    Package,
    Boxes,
    ShoppingCart,
    Users,
    Wallet,
    BarChart3,
    Settings,
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


export default function Sidebar() {

    const { t } = useTranslation()

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

                    <h1 className="text-xl font-bold dark:text-white">

                        CommerceOS

                    </h1>

                    <button
                        onClick={closeSidebar}

                        className="dark:text-white"
                    >

                        <X />

                    </button>

                </div>


                {/* LOGO */}

                <div className="hidden lg:block mb-10">

                    <h1 className="text-2xl font-bold dark:text-white">

                        CommerceOS

                    </h1>

                    <p className="text-sm text-zinc-500 mt-1">

                        Business management platform

                    </p>

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