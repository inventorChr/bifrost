export const mockTokens = [
    {
        name: "Ethereum",
        symbol: "ETH",
        balance: "1.234",
        price: "2468.12",
        value: "3045.26",
        change24h: "2.5",
        history: [2350, 2400, 2380, 2420, 2450, 2460, 2468],
        logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
    },
    {
        name: "Chainlink",
        symbol: "LINK",
        balance: "75.4321",
        price: "15.45",
        value: "1165.43",
        change24h: "1.8",
        history: [15.5, 15.8, 15.7, 15.9, 16.1, 16.2, 16.25],
        logo: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png'
    },
    {
        name: "Uniswap",
        symbol: "UNI",
        balance: "150.5678",
        price: "6.34",
        value: "954.60",
        change24h: "-0.5",
        history: [6.8, 6.7, 6.5, 6.6, 6.4, 6.5, 6.52],
        logo: 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png'
    },
    {
        name: "Aave",
        symbol: "AAVE",
        balance: "5.6789",
        price: "80.78",
        value: "458.74",
        change24h: "3.2",
        history: [78.5, 79.2, 79.8, 80.1, 80.4, 80.5, 80.6],
        logo: 'https://assets.coingecko.com/coins/images/12645/small/AAVE.png'
    },
    {
        name: "Pepe",
        symbol: "PEPE",
        balance: "1000000",
        price: "0.00023",
        value: "230.00",
        change24h: "-1.5",
        history: [0.00024, 0.00023, 0.00022, 0.00023, 0.00023, 0.00023, 0.00023],
        logo: 'https://assets.coingecko.com/coins/images/29850/small/pepe-token.jpeg'
    },
    {
        name: "Shiba Inu",
        symbol: "SHIB",
        balance: "15000000",
        price: "0.000011",
        value: "165.00",
        change24h: "-0.8",
        history: [0.000012, 0.000011, 0.000011, 0.000012, 0.000012, 0.000011, 0.000011],
        logo: 'https://assets.coingecko.com/coins/images/11939/small/shiba.png'
    }
];

export const mockTransactions = [
    { type: 'RECEIVE', token: 'ETH', amount: '1.0', from: '0x1234...5678', timestamp: '2024-03-20 09:15' },
    { type: 'SEND', token: 'LINK', amount: '25.0', to: '0x8765...4321', timestamp: '2024-03-19 15:30' },
    { type: 'RECEIVE', token: 'UNI', amount: '50.0', from: '0x9876...1234', timestamp: '2024-03-18 12:45' },
    { type: 'SEND', token: 'AAVE', amount: '2.5', to: '0x4321...8765', timestamp: '2024-03-17 08:20' }
];