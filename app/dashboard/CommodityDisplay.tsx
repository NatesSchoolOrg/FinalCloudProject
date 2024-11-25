"use client"
import { Commodity } from "./types/commodity.interface";
import { Card } from "antd";

interface Props {
    commodities: Commodity[];
    onCommoditySelect: (commodity: Commodity) => void;
}

const CommodityDisplay = (props: Props) => {
    return (
        <div>
            <Card title="Top 10 Most Sold Commodities">
                Card Content
            </Card>
            <Card title="Top 10 Least Sold Commodities">
                Card Content
            </Card>
            <Card title="Age Ranges for Selected Commodity">
                Card Content
            </Card>
            <Card title="Income Ranges for Selected Commodity">
                Card Content
            </Card>
        </div>
    )
}

export default CommodityDisplay