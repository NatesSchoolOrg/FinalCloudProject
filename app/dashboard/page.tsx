"use client"
import { useProtectedRoute } from '../../hooks/useProtectedRoute';
import Dashboard from './Dashboard'
const DashboardPage = () => {
    //useProtectedRoute();
    return (
        <div>
            <h1>Dashboard</h1>
            <Dashboard></Dashboard>
            
        </div>
    )
}

export default DashboardPage