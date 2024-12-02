"use client"
import React, { MouseEventHandler, useState } from 'react';
import { DataUtilities } from '../utilities/data-utilities';
import { Chart as ChartJS, ArcElement, Title, Tooltip, LinearScale, PointElement, LineElement, ChartData} from 'chart.js';
import { Button, Table } from 'antd';
import { Churn, churnColumns } from '../types/data-interfaces';

const PredictiveModelsPage = () => {
    const [loading, updateLoading] = React.useState<boolean>(false);
    const [churnData, setChurnData] = React.useState<any[]>([]);
    const [chartData, setChartData] = useState<ChartData<"bar", number[], unknown>>({datasets: []});

    const config = {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
    };

    const fetchData = async () => {
        updateLoading(true);
        let query: string = `
            SELECT * FROM 
                dbo.churn
        `;

        const response = await fetch('/api/runquery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    query: query,
                    params: {},
                }),
        });
    
        if (response.ok) {
            const data = await response.json();
            setChurnData(DataUtilities.mapChurnData(data))
            updateLoading(false);
        } else {
            console.error('Failed to fetch best commodity data');
        }
    }

    return (
        <div>
            <Table loading={loading} dataSource={churnData.sort((a: Churn, b: Churn) => b.PREDICTED_CHURN - a.PREDICTED_CHURN)} columns={churnColumns} scroll={{x: "80%"}} />
            <Button onClick={fetchData}>Fetch Data</Button>
        </div>
    );
}

export default PredictiveModelsPage;