"use client"
import type { Metadata } from "next";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Layout, Menu, MenuProps, Spin, theme } from "antd";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";
import NavigationMenu from "./NavigationMenu";

const { Header, Content, Footer } = Layout;
type MenuItem = Required<MenuProps>['items'][number];


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cloud Final Project",
  description: "Final project for Cloud Computing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [pageLoading, setPageLoading] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <Layout style={{height: "100%"}}>
            <NavigationMenu />
            <Content style={{ padding: '0 48px' }}>
              
                <div
                  style={{
                    background: colorBgContainer,
                    minHeight: 280,
                    padding: 24,
                    borderRadius: borderRadiusLG,
                    height: '100%',
                  }}
                >
                  {pageLoading ? (
                        <div style={{ textAlign: "center", marginTop: 100 }}>
                          <Spin size="large" />
                        </div>
                      ) : (
                        children
                      )}
                </div>
              
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Cloud Final Project ©2021 Created by Nate Louder, Madi Coulson, & Jimmy German
            </Footer>
          </Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
