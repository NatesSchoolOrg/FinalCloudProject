"use client";
import { useProtectedRoute } from "../../hooks/useProtectedRoute";
import HolidaySelector from "./HolidaySelector";

const Dashboard = () => {
    //useProtectedRoute();
    return (
        <div>
            <h1>Dashboard</h1>
            <HolidaySelector holidays={[]} onHolidaySelect={(holiday) => console.log(holiday)} />
        </div>
    );
};

export default Dashboard;
