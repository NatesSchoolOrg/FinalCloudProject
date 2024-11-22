'use client'
import React from 'react';
import { runquery, connection } from './database'
import { IRecordSet, IResult } from 'mssql';
import { DataUtilities } from './utilities/data-utilities';
import { Table, Input, Button, Flex, Form, FormProps } from 'antd';
import { DataPull, Household, datapullsColumns } from './types/data-interfaces';

type DataPullSearch = {
    householdNum?: string;
}

const [datapull, updateDataPull] = React.useState<DataPull[]>([]);


const query: string = `
    SELECT *
    FROM
        dbo.transactions as t
    INNER JOIN 
        dbo.households as h ON t.HSHD_NUM = h.HSHD_NUM
    WHERE
        h.HSHD_NUM = @hshdNum;
`

const onFinish: FormProps<DataPullSearch>['onFinish'] = async (values: DataPullSearch) => {
    const result: IRecordSet<any> = (await connection
        .request()
        .input('hshdNum', values.householdNum)
        .query(query) as IResult<any>).recordset;
    updateDataPull(DataUtilities.mapDataPull(result));
}

const DataPullTable: React.FC = () => {
    return (
        <div>
            <Flex vertical gap="middle">
                <Form
                    name="datapull-search"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<DataPullSearch>
                        label="Household Number"
                        name="householdNum"
                        rules={[]}
                    >
                        <Input placeholder="Enter Household Number"/>
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <Table dataSource={datapull} columns={datapullsColumns} />
            </Flex>
        </div>
        
    )
}

export default DataPullTable;