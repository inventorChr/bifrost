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
    const minPrice = Math.min(...prices);

    // Determine if we're dealing with very small numbers and calculate appropriate scale
    const isSmallNumber = maxPrice < 1;
    const priceDifference = maxPrice - minPrice;
    const priceRange = priceDifference === 0 ? maxPrice * 0.1 : priceDifference;

    // Calculate dynamic padding based on price range
    const paddingFactor = isSmallNumber ? 0.001 : 0.005;
    const yMin = Math.max(0, minPrice - (priceRange * paddingFactor));
    const yMax = maxPrice + (priceRange * paddingFactor);

    // Generate time points for the last 24 hours
    const chartData = data.slice(-24).map((price, i) => ({
        time: new Date(Date.now() - (24 - i) * 3600000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        }),
        price: Number(price)
    }));

    // Determine optimal decimal places based on price magnitude
    const getDecimalPlaces = (value) => {
        if (value === 0) return 2;
        const log10 = Math.floor(Math.log10(Math.abs(value)));
        if (log10 >= 0) return 2;
        return Math.min(Math.abs(log10) + 2, 8);
    };

    // Format tooltip value based on price magnitude
    const formatTooltipValue = (value) => {
        if (value === 0) return '$0.00';
        const decimalPlaces = getDecimalPlaces(value);
        return `$${value.toLocaleString(undefined, {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
        })}`;
    };

    // Format Y-axis ticks
    const formatYAxis = (value) => {
        if (value === 0) return '$0';
        const decimalPlaces = getDecimalPlaces(value);
        return `$${value.toLocaleString(undefined, {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
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
                        domain={[yMin, yMax]}
                        scale="linear"
                        tick={{ fill: '#e6f1ff', fontSize: 10 }}
                        tickFormatter={formatYAxis}
                        width={60}
                        allowDataOverflow={false}
                        tickCount={5}
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