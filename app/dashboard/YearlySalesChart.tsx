"use client"
import { Commodity, WeeklyCommodityAmounts } from "../types/data-interfaces";
import { Typography, Empty, Button} from "antd";
import { Chart as ChartJS, ArcElement, Title, Tooltip, LinearScale, PointElement, LineElement, ChartData} from 'chart.js';
import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { DataUtilities } from "../utilities/data-utilities";

ChartJS.register(ArcElement, PointElement, LineElement, Title, Tooltip, LinearScale);

interface Props {
    commodity: Commodity | undefined;
}

const YearlySalesChart = (props: Props) => {
    const [weeklySales, setWeeklySales] = useState<WeeklyCommodityAmounts[]>([]);
    const [chartData, setChartData] = useState<ChartData<"line", number[], unknown>>({datasets: []});

    useEffect(() => {
        if (props.commodity) fetchYearlySales();
    }, [props.commodity]);
    
    useEffect(() => {
        setChartData({
            labels: weeklySales.sort((a, b) => {
                if (a.year !== b.year) {
                    return a.year - b.year;
                } else {
                    return a.week - b.week;
                }
            }).map((weeklySale) => `${weeklySale.week}/${weeklySale.year}`),
            datasets: [{
                label: 'My First Dataset',
                data: weeklySales.sort((a, b) => {
                    if (a.year !== b.year) {
                        return a.year - b.year;
                    } else {
                        return a.week - b.week;
                    }
                }).map((weeklySale) => weeklySale.amount),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        });
    }, [weeklySales]);

    const fetchYearlySales = async () => {
        let query: string = `
            SELECT t.WEEK_NUM, t.[YEAR], COUNT(*) as COUNT
            FROM transactions t
            JOIN
                products p ON t.PRODUCT_NUM = p.PRODUCT_NUM
            WHERE
                p.COMMODITY = @commodity
            GROUP BY t.WEEK_NUM, t.[YEAR]
        `;
        
        const params = {
            commodity: props.commodity?.name
        }

        const response = await fetch('/api/runquery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    query: query,
                    params: params
                }),
        });

        if (response.ok) {
            const data = await response.json();
            setWeeklySales(DataUtilities.mapWeeklySalesData(data));
        } else {
            console.error('Failed to fetch yearly sales data');
        }
    }


    return ( weeklySales.length !== 0 ?
        <div>
            <h1>Yearly Sales Chart</h1>
            <Line data={chartData}></Line>
            <Button type="primary" onClick={fetchYearlySales}>Fetch Yearly Sales</Button>
        </div> : <div>
            <Empty
                description={
                    <Typography.Text>
                        Select a commodity to view its yearly sales.
                    </Typography.Text>
                }
            />
        </div>
    );
}

export default YearlySalesChart;