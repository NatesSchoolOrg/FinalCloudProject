"use client"
import React, { MouseEventHandler } from 'react';
import { IRecordSet, IResult } from 'mssql';
import { DataUtilities } from './utilities/data-utilities';
import { Table, Input, Button, Flex, Form, FormProps } from 'antd';
import { DataPull, Household, datapullsColumns } from './types/data-interfaces';

export default function DataPullTable() {
    const [householdNum, updateHouseholdNum] = React.useState<string>('');
    const [data, updateData] = React.useState<DataPull[]>([]);
    const fetchData = async (householdeNum: string) => {
        const query: string = `
        SELECT Top 15 *
        FROM
            dbo.transactions t
        INNER JOIN 
            dbo.households h ON t.HSHD_NUM = h.HSHD_NUM
        WHERE
            h.HSHD_NUM = ${householdNum};
`
        const response = await fetch('/api/runquery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        if (response.ok) {
            const data = await response.json();
            updateData(DataUtilities.mapDataPull(data));
            console.log(data);
        } else {
            console.error('Failed to fetch data');
        }
 }

    return (
        <div>
            <Flex vertical gap="middle">
                <Input placeholder="Enter Household Number" onChange={(event) => updateHouseholdNum(event.target.value)}/>
                <Button type="primary" onClick={() => fetchData(householdNum)}>
                    Submit
                </Button>
                <Table dataSource={data} columns={datapullsColumns} />
            </Flex>
            HI
        </div>
        
    )
}