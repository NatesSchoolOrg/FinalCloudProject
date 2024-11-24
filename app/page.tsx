import Image from "next/image";
import styles from "./page.module.css";
import { connectToDatabase } from "@/database-config";
import { Button } from "antd";


export default function Home() {
  return (
    <Button type="primary">Login</Button>
  )
}
