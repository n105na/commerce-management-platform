import apiClient from './apiClient'


export async function getDashboardAnalytics() {

    const response = await apiClient.get(
        'reports/dashboard-analytics/'
    )

    return response.data
}