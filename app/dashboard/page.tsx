"use client"
import { useProtectedRoute } from '../../hooks/useProtectedRoute';
import Dashboard from './Dashboard';

const DashboardPage = () => {
    // useProtectedRoute();
    return (
        <div>
            <Dashboard></Dashboard>
        </div>
    )
}

export default DashboardPage
export default DashboardPage