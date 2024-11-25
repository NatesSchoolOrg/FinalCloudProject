"use client";
import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { Form, Input, Button, notification, Alert } from 'antd';

export interface LoginFormValues {
    username: string;
    email: string;
    password: string;
}

export default function Login() {
    const [loginFailed, setLoginFailed] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const onFinish = async (values: LoginFormValues): Promise<void> => {
        console.log('Received values:', values);
        

        try {
            const response = await fetch('/api/runquery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        query:`SELECT * FROM dbo.login WHERE username = @username and password = @password`,
                        params: {
                            username: values.username,
                            password: values.password,
                        }
                    }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data && data.length > 0){
                    setLoginFailed(false);
                    notification.success({
                        message: 'Login Successful',
                        description: `Welcome, ${values.username}!`,
                    });
                    login(values.username);
                    router.push('/data-pulls');
                }
                else if (data && data.length === 0) {
                    setLoginFailed(true);
                }
            }

        } catch (error) {
            console.error('Login error:', error);
            notification.error({
                message: 'Login Failed',
                description: 'Invalid username or password.',
            });
        }
    };

    const onFinishFailed = (errorInfo: any): void => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ width: 300, margin: '0 auto', padding: '50px 0' }}>
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            <Form
                name="loginForm"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
            >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    { required: true, message: 'Please input your username!' },
                ]}
                >
                <Input placeholder="Enter your username" />
            </Form.Item>
            <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email!' },
                    ]}
                >
                    <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: 'Please input your password!' },
                ]}
            >
                <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Log in
                </Button>
            </Form.Item>
            </Form>
            {loginFailed ? 
           <Alert
           message="Login Error"
           description="Username or Password did not match our records."
           type="error"
           closable
         />:null 
        }
        </div>
    );
}
