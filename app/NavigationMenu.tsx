import type { Metadata } from "next";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Layout, Menu, MenuProps, Spin, theme } from "antd";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";

const { Header, Content, Footer } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

const NavigationMenu = () => {
    const [pageLoading, setPageLoading] = useState(false);
    const [current, setCurrent] = useState('login');
    const { isLoggedIn, logout } = useAuth();
    const router = useRouter();

    const navigationItems: MenuItem[] = isLoggedIn ? [
        {
            key: "",
            label: 'Home',
        },
        {
            key: "data-pulls",
            label: 'Data Pulls',
        },
        {
            key: "user-menu",
          label: (
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: 8 }}>👤</span> {/* User Icon */}
              <span>Username</span> {/* Replace with actual username */}
            </div>
          ),
          children: [
            {
              key: "profile",
              label: "Profile",
            },
            {
              key: "logout",
              label: "Log Out",
            },
          ],
        }
    ] : [
        {
            key: "",
            label: 'Home',
        },
        {
            key: "login",
            label: "Log In",
          },
    ];

    const handleNavigation = async (route: string) => {
    setPageLoading(true);
    await router.push(route);
    setPageLoading(false);
    };

    const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === "logout") {
        logout();
        router.push("/"); // Redirect to home on logout
    } else {
        handleNavigation(`/${e.key}`);
    }
    setCurrent(e.key);
    };
    return (
        <Header style={{ display: 'flex', alignItems: 'center', position: "sticky", top: 0,
            zIndex: 1, width: "100%"}}>
            <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[current]}
            items={navigationItems}
            style={{ flex: 1, minWidth: 0}}
            onClick={onClick}
            />
        </Header>
    )
}

export default NavigationMenu;