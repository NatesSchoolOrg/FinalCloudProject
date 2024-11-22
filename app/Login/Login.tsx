'use client';
import React from 'react';
import { Form, Input, Button, notification } from 'antd';


export interface LoginFormValues {
    username: string;
    email: string;
    password: string;
}

export const LoginForm: React.FC = () => {
    // Handle form submission
    const onFinish = (values: LoginFormValues): void => {
        console.log('Received values:', values);
        notification.success({
            message: 'Login Successful',
            description: `Welcome, ${values.username}!`,
        });
    };

    // Handle form submission failure
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
