import React, { useState } from 'react';
import { Commodity } from '../types/data-interfaces';


interface Props {
    commodity: Commodity;
    active: boolean;
    onClick: (commodity: Commodity) => void;
}

const CommodityButton = (props: Props) => {
    const [hovered, setHovered] = useState(false);


    const handleMouseEnter = () => {
        setHovered(true);
    }

    const handleMouseLeave = () => {
        setHovered(false);
    }

    const handleClick = () => {
        props.onClick(props.commodity);
    }

    return (
        <div 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
            onClick={handleClick} 
            style={{
                backgroundColor: hovered || props.active ? '#1677FF' : 'white', 
                cursor: 'pointer', 
                padding: '10px', 
                borderRadius: '5px', 
                margin: '5px'}}>
            <span
                style={{
                    color: hovered || props.active ? 'white' : '#001428',
                }}
            >{props.commodity.name}</span>
            <span 
                style={{
                    float: 'right', 
                    color: hovered || props.active ? 'white' : '#001428',
                }}
            >{props.commodity.amount}</span>
        </div>
    )
}

export default CommodityButton;