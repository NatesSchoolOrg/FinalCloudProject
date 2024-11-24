"use client"
import React from 'react'
import DataPullTable from '../DataPullTable';
import { useProtectedRoute } from '../../hooks/useProtectedRoute';

export default function DataPulls() {
    useProtectedRoute();
    return (
        <DataPullTable />
    )
}