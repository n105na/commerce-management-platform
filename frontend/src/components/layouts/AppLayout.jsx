import {
    Outlet,
} from 'react-router-dom'

import Sidebar from '../common/Sidebar'

import Topbar from '../common/Topbar'


export default function AppLayout() {

    return (

        <div className="flex min-h-screen">

            {/* SIDEBAR */}

            <Sidebar />


            {/* MAIN */}

            <div className="flex-1 flex flex-col">

                <Topbar />

                <main className="flex-1 p-6 lg:p-8 overflow-y-auto">

                    <Outlet />

                </main>

            </div>

        </div>
    )
}