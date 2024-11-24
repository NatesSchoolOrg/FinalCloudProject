"use client"
import React, { MouseEventHandler } from 'react';
import { IRecordSet, IResult } from 'mssql';
import { DataUtilities } from './utilities/data-utilities';
import { Table, InputNumber, Button, Flex, Form, FormProps, InputNumberProps, message } from 'antd';
import { DataPull, Household, datapullsColumns } from './types/data-interfaces';



export default function DataPullTable() {
    const [householdNum, updateHouseholdNum] = React.useState<number>(0);
    const [numRows, updateNumRows] = React.useState<number>(1000);
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

    const onNumRowsChange: InputNumberProps['onChange'] = (value) => {
        updateNumRows(value as number);
    }

    const onkeydown: InputNumberProps['onKeyDown'] = (e) => {
        if (e.key === 'Enter') {
            fetchData();
        }
    }

    const fetchData = async (getAllData: boolean = false) => {
        updateLoading(true);
        const query: string = `
        SELECT TOP ${numRows} * FROM 
            transactions t
        JOIN 
            households h ON t.HSHD_NUM = h.HSHD_NUM
        JOIN
            products p ON t.PRODUCT_NUM = p.PRODUCT_NUM 
        ${getAllData || householdNum === 0 ? '' : 'WHERE h.HSHD_NUM = ' + householdNum };
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
                    <InputNumber prefix="HSHD #:" style={{width: "150px"}} placeholder="0000" onChange={onChange} onKeyDown={onkeydown}/>
                    <Button type="primary" onClick={() => fetchData()}>
                        Search
                    </Button>
                </Flex>
                <InputNumber prefix="Rows:" style={{width: "150px"}} placeholder="1000" onChange={onNumRowsChange}/>
                <Table loading={loading} dataSource={data} columns={datapullsColumns} scroll={{x: "80%"}} />
            </Flex>
        </div>
        
    )
}