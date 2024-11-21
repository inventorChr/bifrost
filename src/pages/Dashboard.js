import React, { useState } from 'react';
import Shield from '../components/Shield';
import Rune from '../components/Rune';

const Dashboard = () => {
    const [walletConnected, setWalletConnected] = useState(false);
    const [walletTokens, setWalletTokens] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    const mockTokens = [
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

    const mockTransactions = [
        { type: 'RECEIVE', token: 'ETH', amount: '1.0', from: '0x1234...5678', timestamp: '2024-03-20 09:15' },
        { type: 'SEND', token: 'HAMR', amount: '50.0', to: '0x8765...4321', timestamp: '2024-03-19 15:30' }
    ];

    const handleConnectWallet = () => {
        setWalletConnected(true);
        setWalletTokens(mockTokens);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Shield
                title="CONNECT TO RÚNSKRIN"
                variant="gold"
                className={`mb-8 ${walletConnected ? 'border-asgard-gold' : 'border-bifrost-teal'}`}
            >
                <div className="flex flex-col items-center gap-4">
                    <p className="text-center mb-4">
                        {walletConnected
                            ? "Your wallet is connected to the realms of Valhalla"
                            : "Connect your wallet to begin your ascension"}
                    </p>
                    <Rune
                        variant={walletConnected ? "secondary" : "primary"}
                        onClick={handleConnectWallet}
                    >
                        {walletConnected ? "WALLET CONNECTED" : "CONNECT WALLET"}
                    </Rune>
                </div>
            </Shield>

            {walletConnected && (
                <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {walletTokens.map((token, index) => (
                            <Shield
                                key={index}
                                title={token.name}
                                variant="frost"
                                className="relative"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="text-xl font-bold text-asgard-gold">{token.symbol}</p>
                                        <p className="text-lg text-frost-white">{token.balance}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg text-frost-white">${token.value}</p>
                                        <p className={`text-sm ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {token.change24h}%
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-center gap-4 mt-4">
                                    <Rune variant="secondary" className="w-32">Send</Rune>
                                    <Rune variant="secondary" className="w-32">Receive</Rune>
                                </div>
                            </Shield>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Shield title="RECENT ACTIVITY" variant="frost">
                            {mockTransactions.map((tx, index) => (
                                <div key={index} className="flex items-center justify-between p-3 border-b border-frost-white/20">
                                    <div className="flex items-center gap-3">
                                        <span className="text-asgard-gold">
                                            {tx.type === 'SEND' ? '→' : '←'}
                                        </span>
                                        <div>
                                            <p className="text-frost-white">{tx.type}</p>
                                            <p className="text-sm text-frost-white/70">{tx.timestamp}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-frost-white">
                                            {`${tx.amount} ${tx.token}`}
                                        </p>
                                        <p className="text-sm text-frost-white/70">
                                            {tx.from ? `From: ${tx.from}` : `To: ${tx.to}`}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </Shield>

                        <Shield title="PORTFOLIO SUMMARY" variant="frost">
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-frost-white">Total Value:</span>
                                    <span className="text-asgard-gold">$3,257.57</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-frost-white">24h Change:</span>
                                    <span className="text-green-400">+3.1%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-frost-white">Number of Assets:</span>
                                    <span className="text-frost-white">2</span>
                                </div>
                            </div>
                        </Shield>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;