"use client";
import { useState } from "react";
import { useProtectedRoute } from "../../hooks/useProtectedRoute";
import { allHolidayData, Holiday } from "../types/holidays";
import Dashboard from "./Dashboard";
import HolidaySelector from "./HolidaySelector";
const DashboardPage = () => {
    const [selectedHoliday, setSelectedHoliday] = useState<Holiday | undefined>(undefined);
    // useProtectedRoute();
    
    const onHolidaySelect = (holiday: Holiday) => {
        setSelectedHoliday(holiday);
    }
    return (
        <div>
            {selectedHoliday ? 
                <Dashboard 
                    selectedHoliday={selectedHoliday} 
                    onClearSelection={() => setSelectedHoliday(undefined)}
                ></Dashboard> : 
                <HolidaySelector 
                    holidays={allHolidayData} 
                    onHolidaySelect={onHolidaySelect} 
                />}
        </div>
    );
};

export default DashboardPage;
