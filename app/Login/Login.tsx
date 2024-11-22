"use client"
import { runquery } from '../database'
import React from 'react'
import { Input, Space } from 'antd';

const onChange = (event: any): void => {
    console.log(event);
}

const Login: React.FC = () => {
  return (
    <Space direction="vertical">
    <Input placeholder="Basic usage" onChange={(event) => onChange(event)}/>
  </Space>
  ) 
}

export default Login