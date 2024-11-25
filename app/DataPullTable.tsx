"use client"
import React, { MouseEventHandler } from 'react';
import { IRecordSet, IResult } from 'mssql';
import { DataUtilities } from './utilities/data-utilities';
import { Table, InputNumber, Button, Flex, Form, FormProps, InputNumberProps, message, Select } from 'antd';
import { DataPull, Household, StoreRegion, StoreRegionEnum, datapullsColumns } from './types/data-interfaces';

interface DataPullQueryParams {
    hshdnum: number;
    numrows: number;
    region: StoreRegion | "all";
}

const regionOptions = Object.keys(StoreRegionEnum).map((region) => {
    return { value: region, label: region };
});
regionOptions.unshift({ value: 'all', label: 'All' });

export default function DataPullTable() {
    const [householdNum, updateHouseholdNum] = React.useState<number>(0);
    const [numRows, updateNumRows] = React.useState<number>(1000);
    const [region, updateRegion] = React.useState<StoreRegion | "all">("all");
    const [data, updateData] = React.useState<DataPull[]>([]);
    const [loading, updateLoading] = React.useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const messageKey = 'updatable';

    const openMessage = () => {
        messageApi.open({
            key: messageKey,
            type: 'error',
            content: 'No Households Were Found',
        });
    };

    const openTimeoutMessage = () => {
        messageApi.open({
            key: messageKey,
            type: 'error',
            content: 'Request Timed Out! Try requesting a smaller number of rows.',
        });
    }

    const openSuccessMessage = () => {
        messageApi.open({
            key: messageKey,
            type: 'success',
            content: 'Data Pulled Successfully',
        });
    }

    const onChange: InputNumberProps['onChange'] = (value) => {
        updateHouseholdNum(value as number);
    };

    function handleRegionChange(value: string) {
        updateRegion(value as StoreRegion);
    };

    const onNumRowsChange: InputNumberProps['onChange'] = (value) => {
        updateNumRows(value as number);
    }

    const onkeydown: InputNumberProps['onKeyDown'] = (e) => {
        if (e.key === 'Enter') {
            fetchData();
        }
    }

    const fetchData = async () => {
        updateLoading(true);
        let query: string = `
            SELECT TOP(@numrows) * FROM 
                transactions t
            JOIN 
                households h ON t.HSHD_NUM = h.HSHD_NUM
            JOIN
                products p ON t.PRODUCT_NUM = p.PRODUCT_NUM 
        `;
        const params: DataPullQueryParams = {
            hshdnum: householdNum,
            numrows: numRows,
            region: region,
        }

        const conditions: string[] = [];

        if (params.hshdnum !== 0) {
            conditions.push(`h.HSHD_NUM = @hshdnum`);
        }

        if (params.region !== 'all') {
            conditions.push(`t.STORE_REGION = @region`);
        }

        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(' AND ')}`;
        }

        const response = await fetch('/api/runquery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, params }),
        });

        if (response.ok) {
            const data = await response.json();
            if (data.length === 0) {
                openMessage();
            } else {
                openSuccessMessage();
            }
            updateData(DataUtilities.mapDataPull(data));
            updateLoading(false);
        } else {
            updateLoading(false);
            openTimeoutMessage();
            console.error('Failed to fetch data');
        }
    }

    return (
        <div>
            {contextHolder}
            <Flex vertical gap="middle">
                <Flex gap="middle">
                    <InputNumber prefix="HSHD # :" style={{width: "150px"}} placeholder="0000" onChange={onChange} onKeyDown={onkeydown}/>
                    <Select
                        defaultValue={'all'}
                        style={{ width: 120 }}
                        onChange={handleRegionChange}
                        options={regionOptions}
                    />
                    <Button type="primary" onClick={() => fetchData()}>
                        Query
                    </Button>
                </Flex>
                <InputNumber prefix="Rows:" style={{width: "150px"}} placeholder="1000" onChange={onNumRowsChange}/>
                <Table loading={loading} dataSource={data} columns={datapullsColumns} scroll={{x: "80%"}} />
            </Flex>
        </div>
        
    )
}