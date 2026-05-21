import {
    createBrowserRouter,
} from 'react-router-dom'

import AppLayout from '../components/layouts/AppLayout'

import ProtectedRoute from './ProtectedRoute'

import RoleProtectedRoute from './RoleProtectedRoute'


/*
=====================================
PAGES
=====================================
*/

import LoginPage from '../pages/LoginPage'

import DashboardPage from '../pages/DashboardPage'

import ProductsPage from '../pages/ProductsPage'

import CategoriesPage from '../pages/CategoriesPage'

import InventoryPage from '../pages/InventoryPage'

import SalesPage from '../pages/SalesPage'

import CustomersPage from '../pages/CustomersPage'

import FinancePage from '../pages/FinancePage'

import ReportsPage from '../pages/ReportsPage'

import SettingsPage from '../pages/SettingsPage'

import CustomerHomePage from '../pages/customer/CustomerHomePage'

import UsersPage from '../pages/UsersPage'

export const router =
    createBrowserRouter([

        /*
        =====================================
        LOGIN
        =====================================
        */

        {
            path: '/login',

            element: <LoginPage />,
        },


        /*
        =====================================
        CUSTOMER PORTAL
        =====================================
        */

        {
            path: '/customer',

            element: (

                <RoleProtectedRoute

                    allowedRoles={[
                        'CUSTOMER'
                    ]}
                >

                    <CustomerHomePage />

                </RoleProtectedRoute>
            ),
        },


        /*
        =====================================
        ADMIN / STAFF DASHBOARD
        =====================================
        */

        {
            path: '/',

            element: (

                <ProtectedRoute>

                    <RoleProtectedRoute

                        allowedRoles={[

                            'ADMIN',

                            'MANAGER',

                            'WORKER',
                        ]}
                    >

                        <AppLayout />

                    </RoleProtectedRoute>

                </ProtectedRoute>
            ),

            children: [

                /*
                =====================================
                DASHBOARD
                =====================================
                */

                {
                    index: true,

                    element: <DashboardPage />,
                },


                /*
                =====================================
                PRODUCTS
                =====================================
                */

                {
                    path: 'products',

                    element: <ProductsPage />,
                },


                /*
                =====================================
                CATEGORIES
                =====================================
                */

                {
                    path: 'categories',

                    element: <CategoriesPage />,
                },


                /*
                =====================================
                INVENTORY
                =====================================
                */

                {
                    path: 'inventory',

                    element: <InventoryPage />,
                },


                /*
                =====================================
                SALES
                =====================================
                */

                {
                    path: 'sales',

                    element: <SalesPage />,
                },


                /*
                =====================================
                CUSTOMERS
                =====================================
                */

                {
                    path: 'customers',

                    element: <CustomersPage />,
                },


                /*
                =====================================
                FINANCE
                =====================================
                */

                {
                    path: 'finance',

                    element: <FinancePage />,
                },


                /*
                =====================================
                REPORTS
                =====================================
                */

                {
                    path: 'reports',

                    element: <ReportsPage />,
                },


                /*
                =====================================
                SETTINGS
                =====================================
                */

                {
                    path: 'settings',

                    element: <SettingsPage />,
                },
                {
    path: 'users',

    element: <UsersPage />,
},
            ],
        },
    ])