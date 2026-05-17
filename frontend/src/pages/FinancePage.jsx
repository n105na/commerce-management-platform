import {
    useQuery,
} from '@tanstack/react-query'

import {
    Wallet,
    TrendingDown,
    BadgeEuro,
} from 'lucide-react'

import Card from '../components/ui/Card'

import PageHeader from '../components/ui/PageHeader'

import {
    getExpenses,
    getSalaryPayments,
} from '../services/financeService'


export default function FinancePage() {

    const {

        data: expensesData,
        isLoading: expensesLoading,

    } = useQuery({

        queryKey: ['expenses'],

        queryFn: getExpenses,
    })


    const {

        data: salaryData,
        isLoading: salaryLoading,

    } = useQuery({

        queryKey: ['salary-payments'],

        queryFn: getSalaryPayments,
    })


    if (
        expensesLoading ||
        salaryLoading
    ) {

        return (

            <div className="p-6">

                Loading finance data...

            </div>
        )
    }


    const expenses =
        expensesData?.results || []

    const salaryPayments =
        salaryData?.results || []


    const totalExpenses = expenses.reduce(

        (sum, expense) =>

            sum + Number(expense.amount),

        0
    )


    const totalSalaries = salaryPayments.reduce(

        (sum, payment) =>

            sum + Number(payment.amount),

        0
    )


    return (

        <div className="space-y-8">

            {/* HEADER */}

            <PageHeader
                title="Finance"

                description="Track expenses and employee salary payments"
            />


            {/* SUMMARY */}

            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-6
                "
            >

                {/* EXPENSES */}

                <Card className="p-6">

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-sm text-zinc-500">

                                Total Expenses

                            </p>

                            <h2
                                className="
                                    mt-4
                                    text-4xl
                                    font-bold
                                    tracking-tight
                                    text-red-600
                                "
                            >

                                €{totalExpenses}

                            </h2>

                        </div>


                        <div
                            className="
                                w-12
                                h-12
                                rounded-2xl
                                bg-red-100
                                dark:bg-red-900/30
                                flex
                                items-center
                                justify-center
                            "
                        >

                            <TrendingDown
                                size={22}
                                className="text-red-500"
                            />

                        </div>

                    </div>

                </Card>


                {/* SALARIES */}

                <Card className="p-6">

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-sm text-zinc-500">

                                Total Salaries

                            </p>

                            <h2
                                className="
                                    mt-4
                                    text-4xl
                                    font-bold
                                    tracking-tight
                                    text-blue-600
                                "
                            >

                                €{totalSalaries}

                            </h2>

                        </div>


                        <div
                            className="
                                w-12
                                h-12
                                rounded-2xl
                                bg-blue-100
                                dark:bg-blue-900/30
                                flex
                                items-center
                                justify-center
                            "
                        >

                            <Wallet
                                size={22}
                                className="text-blue-500"
                            />

                        </div>

                    </div>

                </Card>

            </div>


            {/* EXPENSE TABLE */}

            <Card className="overflow-hidden">

                <div
                    className="
                        p-6
                        border-b
                        border-zinc-200
                        dark:border-zinc-800
                    "
                >

                    <h2
                        className="
                            text-2xl
                            font-bold
                            dark:text-white
                        "
                    >

                        Expenses

                    </h2>

                </div>


                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead
                            className="
                                bg-zinc-50
                                dark:bg-zinc-800
                                border-b
                                border-zinc-200
                                dark:border-zinc-700
                            "
                        >

                            <tr>

                                <th className="text-left p-4 dark:text-white">

                                    Title

                                </th>

                                <th className="text-left p-4 dark:text-white">

                                    Amount

                                </th>

                                <th className="text-left p-4 dark:text-white">

                                    Date

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {expenses.map((expense) => (

                                <tr
                                    key={expense.id}

                                    className="
                                        border-b
                                        border-zinc-100
                                        dark:border-zinc-800
                                        hover:bg-zinc-50
                                        dark:hover:bg-zinc-800/50
                                    "
                                >

                                    <td className="p-4 font-medium dark:text-white">

                                        {expense.title}

                                    </td>

                                    <td className="p-4 text-red-600">

                                        €{expense.amount}

                                    </td>

                                    <td className="p-4 text-zinc-500">

                                        {expense.expense_date}

                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </Card>


            {/* SALARY TABLE */}

            <Card className="overflow-hidden">

                <div
                    className="
                        p-6
                        border-b
                        border-zinc-200
                        dark:border-zinc-800
                    "
                >

                    <h2
                        className="
                            text-2xl
                            font-bold
                            dark:text-white
                        "
                    >

                        Salary Payments

                    </h2>

                </div>


                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead
                            className="
                                bg-zinc-50
                                dark:bg-zinc-800
                                border-b
                                border-zinc-200
                                dark:border-zinc-700
                            "
                        >

                            <tr>

                                <th className="text-left p-4 dark:text-white">

                                    Employee

                                </th>

                                <th className="text-left p-4 dark:text-white">

                                    Amount

                                </th>

                                <th className="text-left p-4 dark:text-white">

                                    Date

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {salaryPayments.map((payment) => (

                                <tr
                                    key={payment.id}

                                    className="
                                        border-b
                                        border-zinc-100
                                        dark:border-zinc-800
                                        hover:bg-zinc-50
                                        dark:hover:bg-zinc-800/50
                                    "
                                >

                                    <td className="p-4 font-medium dark:text-white">

                                        {payment.employee_name}

                                    </td>

                                    <td className="p-4 text-blue-600">

                                        €{payment.amount}

                                    </td>

                                    <td className="p-4 text-zinc-500">

                                        {payment.payment_date}

                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </Card>

        </div>
    )
}