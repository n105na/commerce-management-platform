import {
    createContext,
    useContext,
    useState,
} from 'react'


const SidebarContext = createContext()


export function SidebarProvider({

    children,

}) {

    const [isOpen, setIsOpen] = useState(false)


    function openSidebar() {

        setIsOpen(true)
    }


    function closeSidebar() {

        setIsOpen(false)
    }


    function toggleSidebar() {

        setIsOpen(!isOpen)
    }


    return (

        <SidebarContext.Provider
            value={{

                isOpen,

                openSidebar,

                closeSidebar,

                toggleSidebar,
            }}
        >

            {children}

        </SidebarContext.Provider>
    )
}


export function useSidebar() {

    return useContext(
        SidebarContext
    )
}