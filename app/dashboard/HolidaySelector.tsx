"use client";

import { Flex, Button, Card, message } from "antd";
import { useState } from "react";
import { allHolidayData } from "../types/holidays";
const gridStyle = (holidayName: string, selectedHolidayName: string): React.CSSProperties => {
    const isSelected = holidayName === selectedHolidayName;
    return {
        width: "22%",
        textAlign: "center",
        height: 200,
        cursor: "pointer",
        borderRadius: "10px",
        fontSize: "30px",
        fontWeight: "bold",
        color: isSelected ? "white" : "black",
        backgroundColor: isSelected ? "#d3dbf5" : "white",
        margin: "10px",
        transition: "all 0.3s ease",
        boxShadow: isSelected ? "0 4px 10px rgba(0, 0, 0, 0.2)" : "0 2px 6px rgba(0, 0, 0, 0.1)",
        alignItems: "center",
        justifyContent: "center",
    };
};

interface Props {
    holidays: Holiday[];
    onHolidaySelect: (holiday: Holiday) => void;
}
interface Holiday {
    holiday: string;
    startDate: string;
    endDate: string;
}

const HolidaySelector = (props: Props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const messageKey = "updatable";

    const openMessage = () => {
        messageApi.open({
            key: messageKey,
            type: "error",
            content: "No Holiday Selected",
        });
    };
    const [selectedHoliday, setSelectedHoliday] = useState<Holiday | undefined>(undefined);
    const handleClick = (holiday: Holiday) => {
        setSelectedHoliday(holiday);
        console.log();
    };
    const displaySelectedHoliday = () => {
        console.log(selectedHoliday);
    };
    const handleButtonClick = () => {
        if (selectedHoliday) {
            props.onHolidaySelect(selectedHoliday);
        } else {
            openMessage();
        }
    };
    return (
        <div>
            {contextHolder}
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Holiday Selector</h2>
            <Card
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    padding: "20px",
                }}
            >
                {props.holidays.map((holiday, index) => (
                    <Card.Grid
                        key={index}
                        style={gridStyle(holiday.holiday, selectedHoliday?.holiday as string)}
                        onClick={() => handleClick(holiday)}
                    >
                        {holiday.holiday}
                    </Card.Grid>
                ))}
            </Card>
            <div
                style={{
                    marginTop: "30px",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Button type="primary" onClick={handleButtonClick} style={{ width: "800px" }}>
                    Go To DashBoard
                </Button>
            </div>
        </div>
    );
};

export default HolidaySelector;
