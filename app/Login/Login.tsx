'use client';
import React, {useState} from 'react';
import { NextApiRequest, NextApiResponse } from 'next';
import { Form, Input, Button, notification } from 'antd';
import { connectToDatabase } from '@/database-config';


export interface LoginFormValues {
    username: string;
    email: string;
    password: string;
}

export const LoginForm: React.FC = () => {
    const [loading, setLoading] = useState(false); // To handle loading state
    const [data, setData] = useState(null); // To handle response data

    const onFinish = async (values: LoginFormValues): Promise<void> => {
        console.log('Received values:', values);
        
        setLoading(true); // Start loading state

        try {
            // Send a POST request to the /api/login endpoint
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        username: values.username,
                        password: values.password,
                    }),
            });

            if (response.ok) {
                setData(await response.json());
            }

            notification.success({
                message: 'Login Successful',
                description: `Welcome, ${values.username}!`,
            });

            console.log('Login response:', data);

        } catch (error) {
            console.error('Login error:', error);
            notification.error({
                message: 'Login Failed',
                description: 'Invalid username or password.',
            });
        } finally {
            setLoading(false); // End loading state
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
        </div>
    );
};

export default LoginForm;
