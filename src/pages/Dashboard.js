import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Shield from '../components/Shield';
import Rune from '../components/Rune';
import { connectWallet } from '../store/slices/walletSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { isConnected, tokens, transactions, loading } = useSelector(state => state.wallet);

    const handleConnectWallet = () => {
        dispatch(connectWallet());
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Shield
                title="CONNECT TO RÚNSKRIN"
                variant="gold"
                className={`mb-8 ${isConnected ? 'border-asgard-gold' : 'border-bifrost-teal'}`}
            >
                <div className="flex flex-col items-center gap-4">
                    <p className="text-center mb-4">
                        {isConnected
                            ? "Your wallet is connected to the realms of Valhalla"
                            : "Connect your wallet to begin your ascension"}
                    </p>
                    <Rune
                        variant={isConnected ? "secondary" : "primary"}
                        onClick={handleConnectWallet}
                        disabled={loading.connection}
                    >
                        {loading.connection ? "CONNECTING..." :
                            isConnected ? "WALLET CONNECTED" : "CONNECT WALLET"}
                    </Rune>
                </div>
            </Shield>

            {isConnected && (
                <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {tokens.map((token, index) => (
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
                            {transactions.map((tx, index) => (
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
                                    <span className="text-asgard-gold">
                                        ${tokens.reduce((sum, token) => sum + token.value, 0).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-frost-white">24h Change:</span>
                                    <span className={`${tokens.reduce((sum, token) => sum + token.change24h, 0) / tokens.length >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {(tokens.reduce((sum, token) => sum + token.change24h, 0) / tokens.length).toFixed(1)}%
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-frost-white">Number of Assets:</span>
                                    <span className="text-frost-white">{tokens.length}</span>
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