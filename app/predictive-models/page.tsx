"use client"
import React, { MouseEventHandler, useState, useRef, useEffect} from 'react';
import { DataUtilities } from '../utilities/data-utilities';
import Chart from 'chart.js/auto';
import { Button, Table } from 'antd';
import { Churn, churnColumns } from '../types/data-interfaces';


const PredictiveModelsPage = () => {
    const [loading, updateLoading] = React.useState<boolean>(false);
    const [churnData, setChurnData] = React.useState<any[]>([]);
    const chartRef = useRef<HTMLCanvasElement>(null);

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

    useEffect(() => {
        if (chartRef.current && churnData.length > 0) {
            const counts: Record<number, number> = {};
            churnData.forEach(({ PREDICTED_CHURN }) => {
                counts[PREDICTED_CHURN] = (counts[PREDICTED_CHURN] || 0) + 1;
            });

            const labels = Object.keys(counts).map(key => parseFloat(key).toFixed(2));
            const data = Object.values(counts);

            new Chart(chartRef.current, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Number of Households',
                        data: data,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgb(75, 192, 192)',
                        borderWidth: 1,
                    }],
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Number of Households within the Predicted Churn Rate',
                        },
                        tooltip: {
                            enabled: true,
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Churn Prediction Percentage',
                            },
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Number of Households',
                            },
                        },
                    },
                },
            });
        }
    }, [churnData]);
    

    return (
        <div>
            <Table loading={loading} dataSource={churnData.sort((a: Churn, b: Churn) => b.PREDICTED_CHURN - a.PREDICTED_CHURN)} columns={churnColumns} scroll={{x: "80%"}} />
            {churnData.length > 0 && <canvas ref={chartRef}></canvas>}
            <Button onClick={fetchData}>Fetch Data</Button>
        </div>
    );
}

export default PredictiveModelsPage;