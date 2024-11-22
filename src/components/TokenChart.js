import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const TokenChart = ({ data = [], change24h = 0 }) => {
    // Add validation and data transformation
    const isValidData = Array.isArray(data) && data.length > 0 && data.every(price => !isNaN(Number(price)));

    if (!isValidData) {
        console.log('Invalid or empty chart data:', data);
        return null;
    }

    // Convert all prices to numbers and determine the scale
    const prices = data.map(price => Number(price));
    const maxPrice = Math.max(...prices);

    // Determine if we're dealing with very small numbers
    const isSmallNumber = maxPrice < 0.01;

    // Generate time points for the last 24 hours
    const chartData = data.slice(-24).map((price, i) => ({
        time: new Date(Date.now() - (24 - i) * 3600000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        }),
        price: Number(price)
    }));

    // Calculate min and max with padding
    const minPrice = Math.min(...prices) * 0.995;
    const maxPriceWithPadding = maxPrice * 1.005;

    // Format tooltip value based on price magnitude
    const formatTooltipValue = (value) => {
        const num = Number(value);
        if (isSmallNumber) {
            return `$${num.toExponential(6)}`;
        }
        return `$${num.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 8
        })}`;
    };

    return (
        <div className="h-32 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                    <XAxis
                        dataKey="time"
                        fontSize={10}
                        tick={{ fill: '#e6f1ff' }}
                        interval="preserveStart"
                        tickFormatter={(time) => time.split(':')[0]}
                    />
                    <YAxis
                        domain={[minPrice, maxPriceWithPadding]}
                        hide={true}
                        scale="log"
                        allowDataOverflow={true}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1a2333',
                            border: '1px solid #40E0D0',
                            borderRadius: '4px',
                            padding: '8px'
                        }}
                        labelStyle={{ color: '#e6f1ff' }}
                        itemStyle={{ color: change24h >= 0 ? '#4ade80' : '#f87171' }}
                        formatter={(value) => [formatTooltipValue(value), 'Price']}
                        labelFormatter={(label) => `Time: ${label}`}
                    />
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke={change24h >= 0 ? '#4ade80' : '#f87171'}
                        strokeWidth={2}
                        dot={false}
                        animationDuration={300}
                        isAnimationActive={true}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TokenChart;