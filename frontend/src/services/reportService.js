import apiClient from './apiClient'


export async function getDashboardReports() {

    const response = await apiClient.get(
        'reports/dashboard-analytics/'
    )

    return response.data
}