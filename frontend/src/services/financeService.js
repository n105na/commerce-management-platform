import apiClient from './apiClient'


export async function getExpenses() {

    const response = await apiClient.get(
        'finance/expenses/'
    )

    return response.data
}


export async function getSalaryPayments() {

    const response = await apiClient.get(
        'finance/salary-payments/'
    )

    return response.data
}