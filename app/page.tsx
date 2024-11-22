import Image from "next/image";
import styles from "./page.module.css";
import { connectToDatabase } from "@/database-config";
import LoginForm from "./Login/Login";

export default function Home() {
  return (
    //connectToDatabase("SELECT * FROM dbo.login");
    <LoginForm></LoginForm>
  );
}
