import {
    createBrowserRouter,
} from 'react-router-dom'

import AppLayout from '../components/layouts/AppLayout'

import ProtectedRoute from './ProtectedRoute'

import DashboardPage from '../pages/DashboardPage'
import ProductsPage from '../pages/ProductsPage'
import InventoryPage from '../pages/InventoryPage'
import SalesPage from '../pages/SalesPage'
import CustomersPage from '../pages/CustomersPage'
import FinancePage from '../pages/FinancePage'
import ReportsPage from '../pages/ReportsPage'
import SettingsPage from '../pages/SettingsPage'
import LoginPage from '../pages/LoginPage'


export const router = createBrowserRouter([

    {
        path: '/login',

        element: <LoginPage />,
    },

    {
        path: '/',

        element: (

            <ProtectedRoute>

                <AppLayout />

            </ProtectedRoute>
        ),

        children: [

            {
                index: true,
                element: <DashboardPage />,
            },

            {
                path: 'products',
                element: <ProductsPage />,
            },

            {
                path: 'inventory',
                element: <InventoryPage />,
            },

            {
                path: 'sales',
                element: <SalesPage />,
            },

            {
                path: 'customers',
                element: <CustomersPage />,
            },

            {
                path: 'finance',
                element: <FinancePage />,
            },

            {
                path: 'reports',
                element: <ReportsPage />,
            },

            {
                path: 'settings',
                element: <SettingsPage />,
            },
        ],
    },
])