import React from 'react'
import ReactDOM from 'react-dom/client'

import {
    RouterProvider,
} from 'react-router-dom'

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

import { router } from './routes/router'

import {
    AuthProvider,
} from './contexts/AuthContext'

import {
    ThemeProvider,
} from './contexts/ThemeContext'

import {
    LanguageProvider,
} from './contexts/LanguageContext'

import './i18n/i18n'

import './index.css'
import './styles/theme.css'
import {
    SidebarProvider,
} from './contexts/SidebarContext'
const queryClient = new QueryClient()


ReactDOM.createRoot(
    document.getElementById('root')
).render(

    <React.StrictMode>

        <QueryClientProvider
            client={queryClient}
        >

            <ThemeProvider>

                <LanguageProvider>

                    <SidebarProvider>

                    <AuthProvider>

                        <RouterProvider
                            router={router}
                        />
                        
                    </AuthProvider>
                    </SidebarProvider>
                </LanguageProvider>

            </ThemeProvider>

        </QueryClientProvider>

    </React.StrictMode>
)