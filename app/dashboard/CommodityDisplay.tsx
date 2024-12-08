"use client"
import { Commodity } from "../types/data-interfaces";
import { Card, Typography, Col, Row, Alert, Flex, Spin, Empty} from "antd";
import { Chart as ChartJS, ArcElement, CategoryScale, Title, Tooltip, Legend, ChartData} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react'
import { AgeRange, IncomeRange } from "../types/data-interfaces";
import CommodityButton from "./CommodityButton";
import YearlySalesChart from "./YearlySalesChart";

const { Link } = Typography;
ChartJS.register(ArcElement, CategoryScale, Title, Tooltip, Legend);

interface Props {
    bestCommodities: Commodity[];
    worstCommodities: Commodity[];
    ageRanges: AgeRange[];
    incomeRanges: IncomeRange[];
    onCommoditySelect: (commodity: Commodity) => void;
}

const pieChartColors = [
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    '#ffa600',
]

const options = {
    responsive: true,
    plugins: {
        legend: {
        },
    }
};

const CommodityDisplay = (props: Props) => {
    let [ageRangeData, setAgeRangeData] = useState<ChartData<"pie", number[], unknown>>({datasets: []});
    let [incomeRangeData, setIncomeRangeData] = useState<ChartData<"pie", number[], unknown>>({datasets: []});
    let [selectedCommodity, setSelectedCommodity] = useState<Commodity | undefined>(undefined);
    let [loadingCharts, setLoadingCharts] = useState<boolean>(false);

    useEffect(() => {
        setAgeRangeData({
            labels: props.ageRanges.map((ageRange) => ageRange.range === undefined ? 'Unknown' : ageRange.range),
            datasets: [
                {
                data: props.ageRanges.map((ageRange) => ageRange.amount),
                backgroundColor: pieChartColors,
                hoverOffset: 2,
                }
            ]
        });
        setIncomeRangeData({
            labels: props.incomeRanges.map((incomeRange) => incomeRange.range === undefined ? 'Unknown' : incomeRange.range),
            datasets: [
                {
                data: props.incomeRanges.map((incomeRange) => incomeRange.amount),
                backgroundColor: pieChartColors,
                hoverOffset: 2,
                }
            ]
        });
        setLoadingCharts(false);
    }, [props.ageRanges, props.incomeRanges]);

    const handleClick = (commodity: any) => {
        setLoadingCharts(true);
        setSelectedCommodity(commodity);
        props.onCommoditySelect(commodity);
    };

    const emptyStateTemplate = (
        <Empty
            description={
            <Typography.Text>
                Select a commodity to view age and income ranges.
            </Typography.Text>
            }
        />
    )

    return (
        <div>
            <Flex vertical gap="large">
                <div
                    style={{
                        minHeight: "400px",
                        borderBottom: "2px solid #f0f0f0",
                        paddingBottom: "20px",
                    }}
                >
                    <Row gutter={[16, 16]} style={{ display: 'flex'}}>
                        <Col span={6}>
                            <Card title="5 Most Sold Commodities">
                                {props.bestCommodities.length === 0 ? (
                                    <Spin tip="Loading" size="large" />
                                ) : (
                                    props.bestCommodities.map((commodity, index) => {
                                        return (
                                            <div key={index}>
                                                    <CommodityButton
                                                        commodity={commodity}
                                                        onClick={() => handleClick(commodity)}
                                                        active={selectedCommodity?.name === commodity.name}
                                                    />
                                            </div>
                                        );
                                    })
                                )}
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card
                                title="5 Least Sold Commodities"
                            >
                            {props.worstCommodities.length === 0 ? (
                                <Spin tip="Loading" size="large" />
                            ) : (
                                props.worstCommodities.sort((a, b) => b.amount - a.amount).map((commodity, index) => {
                                    return (
                                        <div key={index}>
                                                <CommodityButton
                                                    commodity={commodity}
                                                    onClick={() => handleClick(commodity)}
                                                    active={selectedCommodity?.name === commodity.name}
                                                />
                                        </div>
                                    );
                                })
                            )}
                        </Card>
                        </Col>
                        <Col span={6}>
                            <Card title={`Age Ranges for ${selectedCommodity?.name}`}>
                                { loadingCharts ? <Spin tip="Loading" size="large" /> :
                                    props.ageRanges.length === 0 ?
                                        emptyStateTemplate :
                                        <Pie data={ageRangeData} options={options} />
                                }
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card title={`Income Ranges for ${selectedCommodity?.name}`}>
                                { loadingCharts ? <Spin tip="Loading" size="large" /> :
                                    props.incomeRanges.length === 0 ?
                                        emptyStateTemplate :
                                        <Pie data={incomeRangeData} options={options} />
                                }
                            </Card>
                        </Col>
                    </Row>
                </div>
                <YearlySalesChart commodity={selectedCommodity}></YearlySalesChart>
            </Flex>          
        </div>
    )
}

export default CommodityDisplay