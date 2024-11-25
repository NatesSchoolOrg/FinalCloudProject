"use client"
import { Commodity } from "./types/commodity.interface";
import { Card, Typography, Col, Row, Alert, Flex, Spin} from "antd";
import { Chart as ChartJS, ArcElement, CategoryScale, Title, Tooltip, Legend} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {useState} from 'react'

const { Link } = Typography;
ChartJS.register(ArcElement, CategoryScale, Title, Tooltip, Legend);

interface Props {
    bestCommodities: Commodity[];
    worstCommodities: Commodity[];
    onCommoditySelect: (commodity: Commodity) => void;
}

const data = {
    //labels: [This will hold the different age ranges],
    datasets: [
      {
        label: 'Dataset 1',
        data: [10, 20, 30, 40, 50], // This will hold the percentage values
        backgroundColor: ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF'], // These colors can change
        hoverOffset: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    }
  };


const CommodityDisplay = (props: Props) => {
    const [isVisible, setIsVisible] = useState(false);
    const handleClick = (commodity: any) => {
        props.onCommoditySelect(commodity);
        setIsVisible(!isVisible);
      };
    return (
        <div>
            <Row gutter={[16, 16]} style={{ display: 'flex'}}>
                <Col span={6}>
                    <Card title="Top 10 Most Sold Commodities">
                        {props.bestCommodities.length === 0 ? (
                            <Spin tip="Loading" size="large" />
                        ) : (
                            props.bestCommodities.map((commodity, index) => {
                                if (props.bestCommodities.length != 0) {
                                    return (
                                        <div key={index}>
                                            <p>
                                                <Link onClick={() => handleClick(commodity)}>
                                                    Name: {commodity.name}, Number: {commodity.amount}
                                                </Link>
                                            </p>
                                        </div>
                                    );
                                }
                            })
                        )}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Top 10 Least Sold Commodities">
                    {props.worstCommodities.length === 0 ? (
                        <Spin tip="Loading" size="large" />
                    ) : (
                        props.worstCommodities.map((commodity, index) => {
                            if (props.worstCommodities.length != 0) {
                                return (
                                    <div key={index}>
                                        <p>
                                            <Link onClick={() => handleClick(commodity)}>
                                                Name: {commodity.name}, Number: {commodity.amount}
                                            </Link>
                                        </p>
                                    </div>
                                );
                            }
                        })
                    )}
                </Card>
                </Col>
                <Col span={6}>
                    <Card title="Age Ranges for Selected Commodity">
                        {isVisible && <Pie data={data} options={options} />}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Income Ranges for Selected Commodity">
                        {isVisible && <Pie data={data} options={options} />}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default CommodityDisplay