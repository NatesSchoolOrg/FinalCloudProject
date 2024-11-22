import Image from "next/image";
import styles from "./page.module.css";
import { connectToDatabase } from "@/database-config";

export default function Home() {
  return (
    connectToDatabase("SELECT * FROM dbo.login")
  );
}
