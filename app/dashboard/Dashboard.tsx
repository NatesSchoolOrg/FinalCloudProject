"use client"
import React, { MouseEventHandler, useState } from 'react';
import { Holiday } from '../types/holidays';
import { IRecordSet, IResult } from 'mssql';
import { DataUtilities } from '../utilities/data-utilities';
import { Table, InputNumber, Button, Flex, Form, FormProps, InputNumberProps, message, Select } from 'antd';
import { Commodity, Household, StoreRegion, StoreRegionEnum, datapullsColumns } from '../types/data-interfaces';

export default function Dashboard() {
    const [holiday, setHoliday] = React.useState<Holiday | undefined>(undefined);
    const [year, setYear] = React.useState<string>("2019");
    const [bestCommodities, setBestCommodities] = useState<Commodity[]>([]);
    const [worstCommodities, setWorstCommodities] = useState<Commodity[]>([]);

    const formatDate = (date: string) => {
        let dateArray = date.split('/');
        return `${dateArray[2]}-${dateArray[0]}-${dateArray[1]}`;
    }

    const fetchCommodityData = async (selectedHoliday: Holiday) => {
        setHoliday(selectedHoliday);
        let queryBestCommodity: string = `
            SELECT TOP(3) p.COMMODITY, COUNT(*) as COUNT
            FROM transactions t
            JOIN 
                households h ON t.HSHD_NUM = h.HSHD_NUM
            JOIN
                products p ON t.PRODUCT_NUM = p.PRODUCT_NUM
            WHERE
                CAST(t.PURCHASE_DATE AS DATE) BETWEEN '2019-01-01' AND '2019-12-31'
            GROUP BY p.COMMODITY
            ORDER BY COUNT(*) DESC 
        `;

        let queryWorstCommodity: string = `
            SELECT TOP(3) p.COMMODITY, COUNT(*) as COUNT
            FROM transactions t
            JOIN 
                households h ON t.HSHD_NUM = h.HSHD_NUM
            JOIN
                products p ON t.PRODUCT_NUM = p.PRODUCT_NUM
            WHERE
                CAST(t.PURCHASE_DATE AS DATE) BETWEEN '2019-01-01' AND '2019-12-31'
            GROUP BY p.COMMODITY
            ORDER BY COUNT(*) ASC
        `;
        
        const params = {
            startDate: formatDate(holiday?.startDate + '/' + year),
            endDate: formatDate(holiday?.endDate + '/' + year),
        }

        const responseBest = await fetch('/api/runquery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    query: queryBestCommodity,
                    params: params,
                }),
        });

        if (responseBest.ok) {
            const data = await responseBest.json();
            setBestCommodities(DataUtilities.mapCommodityData(data));
        } else {
            console.error('Failed to fetch best commodity data');
        }

        const responseWorst = await fetch('/api/runquery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    query: queryWorstCommodity,
                    params: params,
                }),
        });

        if (responseWorst.ok) {
            const data = await responseWorst.json();
            setWorstCommodities(DataUtilities.mapCommodityData(data));
        } else {
            console.error('Failed to fetch worst commodity data');
        }
    }

    
    
    return (
        <Button onClick={() => fetchCommodityData({
            holiday: "Christmas",
            startDate: "12/18",
            endDate: "01/01"
        },)}>Run</Button>
    )
}