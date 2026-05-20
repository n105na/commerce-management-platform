import {
    createContext,
    useContext,
} from 'react'

import {
    useQuery,
} from '@tanstack/react-query'

import {
    getPlatformSettings,
} from '../services/settingsService'


const SettingsContext =
    createContext()


export function SettingsProvider({

    children,

}) {

    const {

        data,
        isLoading,

    } = useQuery({

        queryKey: ['platform-settings'],

        queryFn: getPlatformSettings,
    })


    return (

        <SettingsContext.Provider

            value={{

                settings: data,

                isLoading,
            }}
        >

            {children}

        </SettingsContext.Provider>
    )
}


export function useSettings() {

    return useContext(
        SettingsContext
    )
}