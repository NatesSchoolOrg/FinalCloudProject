"use client"
import React, { MouseEventHandler, useState } from 'react';
import { Holiday } from '../types/holidays';
import { IRecordSet, IResult } from 'mssql';
import { DataUtilities } from '../utilities/data-utilities';
import { Table, InputNumber, Button, Flex, Form, FormProps, InputNumberProps, message, Select } from 'antd';
import { AgeRange, Commodity, Household, IncomeRange, StoreRegion, StoreRegionEnum, datapullsColumns } from '../types/data-interfaces';
import CommodityDisplay from './CommodityDisplay';



export default function Dashboard() {
    const [holiday, setHoliday] = React.useState<Holiday | undefined>(undefined);
    const [year, setYear] = React.useState<string>("2019");
    const [bestCommodities, setBestCommodities] = useState<Commodity[]>([]);
    const [worstCommodities, setWorstCommodities] = useState<Commodity[]>([]);
    const [selectedCommodity, setSelectedCommodity] = useState<Commodity | undefined>(undefined);
    const [ageRanges, setAgeRanges] = useState<AgeRange[]>([]);
    const [incomeRanges, setIncomeRanges] = useState<IncomeRange[]>([]);

    const formatDate = (date: string): string => {
        let dateArray = date.split('/');
        return `${dateArray[2]}-${dateArray[0]}-${dateArray[1]}`;
    }

    const fetchCommodityData = async (selectedHoliday: Holiday) => {
        setHoliday(selectedHoliday);
        let queryBestCommodity: string = `
            SELECT TOP(5) p.COMMODITY, COUNT(*) as COUNT
            FROM transactions t
            JOIN
                products p ON t.PRODUCT_NUM = p.PRODUCT_NUM
            WHERE
                CAST(t.PURCHASE_DATE AS DATE) BETWEEN @startdate AND @enddate
            GROUP BY p.COMMODITY
            ORDER BY COUNT(*) DESC 
        `;

        let queryWorstCommodity: string = `
            SELECT TOP(5) p.COMMODITY, COUNT(*) as COUNT
            FROM transactions t
            JOIN
                products p ON t.PRODUCT_NUM = p.PRODUCT_NUM
            WHERE
                CAST(t.PURCHASE_DATE AS DATE) BETWEEN @startdate AND @enddate
            GROUP BY p.COMMODITY
            ORDER BY COUNT(*) ASC
        `;
        
        const params = {
            startdate: formatDate(selectedHoliday?.startDate + '/' + year),
            enddate: formatDate(selectedHoliday?.endDate + '/' + year),
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
            setBestCommodities(DataUtilities.mapCommodityData(data))
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

    const fetchAgeAndIncomeData = async (commodity: Commodity) => {
        let queryAgeRanges: string = `
            SELECT h.AGE_RANGE, COUNT(*) as COUNT
            FROM transactions t
            JOIN 
                households h ON t.HSHD_NUM = h.HSHD_NUM
            JOIN
                products p ON t.PRODUCT_NUM = p.PRODUCT_NUM
            WHERE
                (CAST(t.PURCHASE_DATE AS DATE) BETWEEN @startdate AND @enddate) AND p.COMMODITY = @commodity
            GROUP BY h.AGE_RANGE

        `;

        let queryIncomeRanges: string = `
            SELECT h.INCOME_RANGE, COUNT(*) as COUNT
            FROM transactions t
            JOIN 
                households h ON t.HSHD_NUM = h.HSHD_NUM
            JOIN
                products p ON t.PRODUCT_NUM = p.PRODUCT_NUM
            WHERE
                (CAST(t.PURCHASE_DATE AS DATE) BETWEEN @startdate AND @enddate) AND p.COMMODITY = @commodity
            GROUP BY h.INCOME_RANGE
        `;

        const params = {
            startdate: formatDate(holiday?.startDate + '/' + year),
            enddate: formatDate(holiday?.endDate + '/' + year),
            commodity: commodity.name,
        }

        const responseAge = await fetch('/api/runquery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    query: queryAgeRanges,
                    params: params,
                }),
        });

        if (responseAge.ok) {
            const data = await responseAge.json();
            setAgeRanges(DataUtilities.mapAgeRangeData(data));
        } else {
            console.error('Failed to fetch age range data');
        }

        const responseIncome = await fetch('/api/runquery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    query: queryIncomeRanges,
                    params: params,
                }),
        });

        if (responseIncome.ok) {
            const data = await responseIncome.json();
            setIncomeRanges(DataUtilities.mapIncomeRangeData(data));
        } else {
            console.error('Failed to fetch income range data');
        }
    }

    const handleCommoditySelect = (commodity: Commodity) => {
        setSelectedCommodity(commodity);
        fetchAgeAndIncomeData(commodity);
    }
        
    
    return (
        <Flex vertical gap="large">
            <Flex vertical gap="middle">
                <h1>
                    Dashboard | {holiday?.holiday} {year} {selectedCommodity ? `| ${selectedCommodity.name}` : ''}
                </h1>
                <CommodityDisplay
                    bestCommodities={bestCommodities}
                    worstCommodities={worstCommodities}
                    incomeRanges={incomeRanges}
                    ageRanges={ageRanges}
                    onCommoditySelect={handleCommoditySelect}>
                </CommodityDisplay>
            </Flex>
            <Button onClick={() => fetchCommodityData({
                holiday: "Christmas",
                startDate: "12/18",
                endDate: "12/31"
            },)}>Run</Button>
        </Flex>
    )
}