"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { connectToDatabase } from "@/database-config";
import { Button, Card, message } from "antd";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import DashBoardPhoto from "@/public/DashboardPhoto.jpg";
const cardStyle: React.CSSProperties = {
    width: "600px",
    height: "500px",
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
};
export default function Home() {
    const router = useRouter();

    const [cardOneHovered, setCardOneHovered] = useState<boolean>(false);
    const [cardTwoHovered, setCardTwoHovered] = useState<boolean>(false);
    const [cardThreeHovered, setCardThreeHovered] = useState<boolean>(false);
    const handleClick = (route: string) => {
        router.push(route);
    };

    const handleMouseEnter = (cardNumber: number) => {
        if (cardNumber === 1) {
            setCardOneHovered(true);
        } else if (cardNumber === 2) {
            setCardTwoHovered(true);
        } else if (cardNumber === 3) {
            setCardThreeHovered(true);
        }
    };
    
    const handleMouseLeave = (cardNumber: number) => {
        if (cardNumber === 1) {
            setCardOneHovered(false);
        } else if (cardNumber === 2) {
            setCardTwoHovered(false);
        } else if (cardNumber === 3) {
            setCardThreeHovered(false);
        }
    };

    return (
        <div id="HomePage" style={{ padding: "20px" }}>
            <div style={{ marginBottom: "30px" }}>
                <h1 style={{ fontSize: "54px", fontWeight: "bold", textAlign: "center" }}>Cloud Computing Project 2024</h1>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                }}
            >
                <Card
                    hoverable
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={() => handleMouseLeave(1)}
                    onClick={() => handleClick("/dashboard")}
                    style={{ ...cardStyle, backgroundColor: cardOneHovered ? "#f4f4f4" : "white" }}
                    cover={
                        <img
                            alt="example"
                            src="https://upload.wikimedia.org/wikipedia/commons/0/0a/Hand%2C_bar_and_pie_chart%2C_light.png"
                            style={{
                                height: "350px", // Adjust height as needed
                                width: "90%", // Make it span the card's width
                                objectFit: "cover", // Ensures the image covers the container
                                borderRadius: "10px 10px 0 0", // Match the card's border-radius
                                justifyContent: "center",
                                margin: "auto",
                            }}
                        />
                    }
                >
                    Dashboard
                </Card>
                <Card
                    hoverable
                    onMouseEnter={() => handleMouseEnter(2)}
                    onMouseLeave={() => handleMouseLeave(2)}
                    onClick={() => handleClick("/data-pulls")}
                    style={{ ...cardStyle, backgroundColor: cardTwoHovered ? "#f4f4f4" : "white" }}
                    cover={
                        <img
                            alt="example"
                            src="https://cdn-icons-png.flaticon.com/512/1742/1742483.png"
                            style={{
                                height: "350px", // Adjust height as needed
                                width: "60%", // Make it span the card's width
                                objectFit: "cover", // Ensures the image covers the container
                                borderRadius: "10px 10px 0 0", // Match the card's border-radius
                                justifyContent: "center",
                                margin: "auto",
                            }}
                        />
                    }
                >
                    DataPull
                </Card>
                <Card
                    hoverable
                    onMouseEnter={() => handleMouseEnter(3)}
                    onMouseLeave={() => handleMouseLeave(3)}
                    onClick={() => handleClick("/predictive-models")}
                    style={{ ...cardStyle, backgroundColor: cardThreeHovered ? "#f4f4f4" : "white" }}
                    cover={
                        <img
                            alt="example"
                            src="https://cdn-icons-png.flaticon.com/512/2103/2103652.png"
                            style={{
                                height: "350px", // Adjust height as needed
                                width: "60%", // Make it span the card's width
                                objectFit: "cover", // Ensures the image covers the container
                                borderRadius: "10px 10px 0 0", // Match the card's border-radius
                                justifyContent: "center",
                                margin: "auto",
                            }}
                        />
                    }
                >
                    Predictive Models
                </Card>
            </div>
        </div>
    );
}
