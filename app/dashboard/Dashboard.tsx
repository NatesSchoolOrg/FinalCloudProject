"use client"
import React, { MouseEventHandler } from 'react';
import { Holiday } from '../types/holidays';
import { IRecordSet, IResult } from 'mssql';
import { DataUtilities } from '../utilities/data-utilities';
import { Table, InputNumber, Button, Flex, Form, FormProps, InputNumberProps, message, Select } from 'antd';
import { DataPull, Household, StoreRegion, StoreRegionEnum, datapullsColumns } from '../types/data-interfaces';

export default function Dashboard() {
    const [holiday, setHoliday] = React.useState<Holiday | undefined>(undefined);
    const [year, setYear] = React.useState<string>("2019");

    const fetchCommodityData = async (selectedHoliday: Holiday) => {
        setHoliday(selectedHoliday);
        let queryBestCommodity: string = `
            SELECT TOP(10) p.COMMODITY, COUNT(*)
            FROM transactions t
            JOIN 
                households h ON t.HSHD_NUM = h.HSHD_NUM
            JOIN
                products p ON t.PRODUCT_NUM = p.PRODUCT_NUM
            GROUP BY p.COMMODITY
            ORDER BY COUNT(*) DESC 
        `;

        let query_worst: string = `
            SELECT TOP(10) p.COMMODITY, COUNT(*)
            FROM transactions t
            JOIN 
                households h ON t.HSHD_NUM = h.HSHD_NUM
            JOIN
                products p ON t.PRODUCT_NUM = p.PRODUCT_NUM 
            GROUP BY p.COMMODITY
        `;
        
        const params = {
            startDate: new Date(holiday?.startDate + '/' + year),
            endDate: new Date(holiday?.endDate + '/' + year),
        }
    }

    
    
    return (
        <HolidaySelector onHolidaySelected={fetchData} />
    )
}