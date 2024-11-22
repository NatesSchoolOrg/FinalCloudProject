'use client'
import React from 'react';
import { runquery } from './database'
import { IRecordSet, IResult } from 'mssql';
import { DataUtilities } from './utilities/data-utilities';
import { Table, Input, Button, Flex, Form, FormProps } from 'antd';
import { DataPull, Household, datapullsColumns } from './types/data-interfaces';

const [datapull, updateDataPull] = React.useState<DataPull[]>([]);
const [householdNum, updateHouseholdNum] = React.useState<string>('');

const query: string = `
    SELECT Top 15 *
    FROM
        dbo.transactions as t
    INNER JOIN 
        dbo.households as h ON t.HSHD_NUM = h.HSHD_NUM
    WHERE
        h.HSHD_NUM = "4851";
`

// const onSubmit = async (): Promise<void> => {
//     const result: IRecordSet<any> = (await runquery(query) as IResult<any>).recordset;
//     // const result: IRecordSet<any> = (await connection
//     //     .request()
//     //     .input('hshdNum', householdNum)
//     //     .query(query) as IResult<any>).recordset;
//     updateDataPull(DataUtilities.mapDataPull(result));
// }

export default function DataPullTable() {
    return (
        <div>
            {/* <Flex vertical gap="middle">
                <Input placeholder="Enter Household Number"/>
                <Button type="primary" onClick={onSubmit}>
                    Submit
                </Button>
                <Table dataSource={datapull} columns={datapullsColumns} />
            </Flex> */}
            HI
        </div>
        
    )
}