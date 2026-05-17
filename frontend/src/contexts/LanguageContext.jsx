import {
    createContext,
    useContext,
    useState,
} from 'react'

import i18n from '../i18n/i18n'


const LanguageContext = createContext()


export function LanguageProvider({

    children,

}) {

    const [language, setLanguage] = useState(

        localStorage.getItem(
            'language'
        ) || 'en'
    )


    function changeLanguage(lang) {

        i18n.changeLanguage(lang)

        localStorage.setItem(
            'language',
            lang
        )

        setLanguage(lang)


        // RTL SUPPORT

        document.documentElement.dir =

            lang === 'ar'
                ? 'rtl'
                : 'ltr'
    }


    return (

        <LanguageContext.Provider
            value={{
                language,
                changeLanguage,
            }}
        >

            {children}

        </LanguageContext.Provider>
    )
}


export function useLanguage() {

    return useContext(
        LanguageContext
    )
}