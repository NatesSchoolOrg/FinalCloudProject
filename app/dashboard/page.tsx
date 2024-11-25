"use client"
import { useProtectedRoute } from '../../hooks/useProtectedRoute';

const Dashboard = () => {
    useProtectedRoute();
    return (
        <div>
            <h1>Dashboard</h1>
            
        </div>
    )
}

export default Dashboard