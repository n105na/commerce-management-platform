import apiClient from './apiClient'


/*
=====================================
GET EXPENSES
=====================================
*/

export async function getExpenses() {

    const response =
        await apiClient.get(
            'finance/expenses/'
        )

    return response.data
}


/*
=====================================
GET SALARY PAYMENTS
=====================================
*/

export async function getSalaryPayments() {

    const response =
        await apiClient.get(
            'finance/salary-payments/'
        )

    return response.data
}


/*
=====================================
CREATE EXPENSE
=====================================
*/

export async function createExpense(
    data
) {

    const response =
        await apiClient.post(

            'finance/expenses/',

            data
        )

    return response.data
}


/*
=====================================
CREATE SALARY PAYMENT
=====================================
*/

export async function createSalaryPayment(
    data
) {

    const response =
        await apiClient.post(

            'finance/salary-payments/',

            data
        )

    return response.data
}