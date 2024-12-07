"use client"
import Image from "next/image";
import React, { useState, useEffect} from 'react';
import { DataUtilities } from '../utilities/data-utilities';
import { Bar } from 'react-chartjs-2';
import { List, Select, Table, Typography } from 'antd';
import { Chart as ChartJS, ArcElement, Title, Tooltip, LinearScale, PointElement, ChartData, BarElement, ChartOptions, CategoryScale} from 'chart.js';
import { Churn, churnColumns, BasketFrequency } from '../types/data-interfaces';
import { useProtectedRoute } from "../../hooks/useProtectedRoute";

ChartJS.register(ArcElement, PointElement, BarElement, CategoryScale, Title, Tooltip, LinearScale);

const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'PREDICTED_CHURN Distribution Bar Graph',
        },
        tooltip: {
            enabled: true,
        },
    },
    scales: {
        x: {
            title: {
                display: true,
                text: 'PREDICTED_CHURN',
            },
        },
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Count',
            },
        },
    },
};

const PredictiveModelsPage = () => {
    useProtectedRoute();

    const [loading, updateLoading] = useState<boolean>(false);
    const [churnData, setChurnData] = useState<Churn[]>([]);
    const [frequencyData, setFrequencyData] = useState<BasketFrequency[]>([]);
    const [chartData, setChartData] = useState<ChartData<"bar", number[], unknown>>({datasets: []});
    const [productNumbers, setProductNumbers] = useState<Set<number>>(new Set<number>());
    const [selectedProductNumber, setSelectedProductNumber] = useState<number | undefined>(undefined);
    const [selectedProductFrequentItems, setSelectedProductFrequentItems] = useState<Record<number, number>>([]);

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

        let query_frequency: string = `
            SELECT * FROM 
                dbo.basket_frequency
        `;

        const response_frequency = await fetch('/api/runquery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    query: query_frequency,
                    params: {},
                }),
        });
    
        if (response_frequency.ok) {
            const frequency_data = await response_frequency.json();
            setFrequencyData(DataUtilities.mapBasketFrequencyData(frequency_data))
            updateLoading(false);
        } else {
            console.error('Failed to fetch best commodity data');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const counts: Record<number, number> = {};
        churnData.forEach(({ PREDICTED_CHURN }) => {
            counts[PREDICTED_CHURN] = (counts[PREDICTED_CHURN] || 0) + 1;
        });

        Object.keys(counts).forEach(key => {
            if (counts[parseFloat(key)] < 2) {
                delete counts[parseFloat(key)];
            }
        });
        setChartData({ ...chartData,
            labels: Object.keys(counts).map(key => parseFloat(key).toFixed(2)),
            datasets: [{
                label: 'Count of PREDICTED_CHURN',
                data: Object.values(counts),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1,
            }],
                
        })
    }, [churnData]);

    useEffect(() => {
        let productNumsSet = new Set<number>();
        if (productNumbers === undefined) {
            return;
        }
        frequencyData.forEach(({ PRODUCT_NUMS }) => {
            PRODUCT_NUMS?.forEach(pn =>
                productNumsSet.add(pn)
            )
        });
        setProductNumbers(productNumsSet);
    }, [frequencyData]);

    useEffect(() => {
        setSelectedProductFrequentItems({});
        if (selectedProductNumber === undefined) {
            return;
        }
        frequencyData.forEach(({ PRODUCT_NUMS}) => {
            if (PRODUCT_NUMS.includes(selectedProductNumber)) {
                setSelectedProductFrequentItems((prev) => {
                    let newPrev = {...prev};
                    PRODUCT_NUMS.forEach(pn => {
                        if (pn !== selectedProductNumber) {
                            newPrev[pn] = (newPrev[pn] || 0) + 1;
                        }
                    });
                    return newPrev;
                });
            }
        });
        console.log(selectedProductFrequentItems);
    }, [selectedProductNumber]);


    const handleChange = (value: any) => {
        setSelectedProductNumber(value);
    }
    
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                justifyContent: 'space-between',
                padding: '20px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px',
                    gap: '16px',
                    borderRadius: '16px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: "#001529" }}>Basket Analysis</h2>
                    <a href="https://github.com/madicoulson/finalCloudProject/blob/main/models/main.py" target='_blank'>
                        <Image src={'/github.png'} width={24} height={24} alt="GitHub" />
                    </a>
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <Typography>Select a product number to see its frequent items:</Typography>
                    <Select
                        defaultValue="Item #"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={Array.from(productNumbers).map(pn => ({ value: pn, label: pn }))}
                    />
                </div>
                <List
                    bordered
                    dataSource={Object.entries(selectedProductFrequentItems).map(([key, value]) => ({ key, value }))}
                    renderItem={({key, value}) => (
                        <List.Item>
                            The selected item has been bought with Item <strong style={{color: '#001529'}}>{key}</strong> <strong>{value}</strong> times in the last month.
                        </List.Item>
                    )}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px',
                    gap: '16px',
                    borderRadius: '16px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                }}
            >
            
            <div
                    style={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: "#001529" }}>Churn Prediction</h2>
                    <a href="https://github.com/madicoulson/finalCloudProject/blob/main/models/churn-prediction.py" target='_blank'>
                        <Image src={'/github.png'} width={24} height={24} alt="GitHub" />
                    </a>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '20px',
                    }}
                >
                    <div
                        style={{
                            height: '500px',
                            width: '100%',
                            overflow: 'auto',
                            scrollbarWidth: 'none',
                            boxSizing: 'border-box'
                        }}
                    >
                        <Table loading={loading} dataSource={churnData.sort((a: Churn, b: Churn) => b.PREDICTED_CHURN - a.PREDICTED_CHURN)} columns={churnColumns} scroll={{x: "80%"}} />
                    </div>
                    <div
                        style={{
                            height: '500px',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PredictiveModelsPage;