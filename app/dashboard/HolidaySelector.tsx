"use client";

import { Flex, Button, Card, message } from "antd";
import { useState } from "react";
const gridStyle = (holidayName: string, selectedHolidayName: string): React.CSSProperties => {
    return {
        width: "25%",
        textAlign: "center",
        height: 400,
        backgroundColor: holidayName === selectedHolidayName ? "#d3dbf5" : "white",
    };
};
const holidayData = [
    {
        holiday: "Christmas",
        startDate: "12/18",
        endDate: "01/01",
    },
    {
        holiday: "New Year",
        startDate: "12/25",
        endDate: "01/01",
    },
    {
        holiday: "Thanksgiving",
        startDate: "11/21",
        endDate: "12/05",
    },
    {
        holiday: "Halloween",
        startDate: "10/24",
        endDate: "11/07",
    },
    {
        holiday: "St. Patricks Day",
        startDate: "03/10",
        endDate: "03/24",
    },
    {
        holiday: "Easter",
        startDate: "04/01",
        endDate: "04/14",
    },
    {
        holiday: "Fourth of July",
        startDate: "06/27",
        endDate: "07/04",
    },
    {
        holiday: "Valentine Day",
        startDate: "02/07",
        endDate: "02/21",
    },
];

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
            <Card title="Holiday Selector">
                {holidayData.map((holiday, index) => (
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
                    textAlign: "center",
                    width: "300px",
                }}
            >
                <Button
                    type="primary"
                    onClick={handleButtonClick}
                    style={{ width: "500px", display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                    Go To DashBoard
                </Button>
            </div>
        </div>
    );
};

export default HolidaySelector;
