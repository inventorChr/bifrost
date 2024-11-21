export const mockTokens = [
    {
        name: "Ethereum",
        symbol: "ETH",
        balance: "1.234",
        value: 2468.12,
        change24h: 5.2,
        history: [2350, 2400, 2380, 2420, 2468]
    },
    {
        name: "Hammer Token",
        symbol: "HAMR",
        balance: "456.789",
        value: 789.45,
        change24h: -2.1,
        history: [800, 785, 790, 782, 789]
    }
];

export const mockTransactions = [
    { type: 'RECEIVE', token: 'ETH', amount: '1.0', from: '0x1234...5678', timestamp: '2024-03-20 09:15' },
    { type: 'SEND', token: 'HAMR', amount: '50.0', to: '0x8765...4321', timestamp: '2024-03-19 15:30' }
];