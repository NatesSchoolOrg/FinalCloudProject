"use client";
import { useProtectedRoute } from "../../hooks/useProtectedRoute";
import Dashboard from "./Dashboard";
import HolidaySelector from "./HolidaySelector";
const DashboardPage = () => {
    // useProtectedRoute();
    return (
        <div>
            <HolidaySelector holidays={[]} onHolidaySelect={(holiday) => console.log(holiday)} />
            <Dashboard></Dashboard>
        </div>
    );
};

export default DashboardPage;
