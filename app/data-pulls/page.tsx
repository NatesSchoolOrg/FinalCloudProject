import React from 'react'
import { runquery } from '../database'
import { IRecordSet, IResult } from 'mssql';
import { DataUtilities } from '../utilities/data-utilities';
import { title } from 'process';
import { Table } from 'antd';
import { DataPull, Household, datapullsColumns } from '../types/data-interfaces';
import DataPullTable from '../DataPullTable';

export default function DataPulls() {
    return (
        <DataPullTable />
    )
}