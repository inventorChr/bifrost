import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const TokenChart = ({ data = [], change24h = 0 }) => {
    if (!data || data.length === 0) return null;

    // Take last 24 points from the data array (if available)
    const chartData = data.slice(-24).map((price, i) => ({
        time: new Date(Date.now() - (24 - i) * 3600000).toLocaleTimeString([], { hour: '2-digit' }),
        price: Number(price).toFixed(2)
    }));

    const minPrice = Math.min(...data) * 0.995;
    const maxPrice = Math.max(...data) * 1.005;

    return (
        <div className="h-32 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                    <XAxis
                        dataKey="time"
                        fontSize={10}
                        tick={{ fill: '#e6f1ff' }}
                        interval="preserveStart"
                    />
                    <YAxis
                        domain={[minPrice, maxPrice]}
                        hide={true}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1a2333',
                            border: '1px solid #40E0D0',
                            borderRadius: '4px'
                        }}
                        labelStyle={{ color: '#e6f1ff' }}
                        itemStyle={{ color: change24h >= 0 ? '#4ade80' : '#f87171' }}
                        formatter={(value) => [`$${value}`, 'Price']}
                    />
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke={change24h >= 0 ? '#4ade80' : '#f87171'}
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TokenChart;