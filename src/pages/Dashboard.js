import React, { useEffect } from 'react';
import { useWallet } from '../hooks/useWallet';
import Shield from '../components/Shield';
import Rune from '../components/Rune';
import TransitionText from '../components/TransitionText';
import { mockTokens, mockTransactions } from '../store/mockData';

const TokenCard = ({ token }) => (
    <Shield
        title={token.name}
        variant="frost"
        className="relative"
        data-testid={`token-card-${token.symbol}`}
    >
        <div className="flex justify-between items-center mb-4">
            <div>
                <p className="text-xl font-bold text-asgard-gold" data-testid={`token-symbol-${token.symbol}`}>
                    {token.symbol}
                </p>
                <p className="text-lg text-frost-white" data-testid={`token-balance-${token.symbol}`}>
                    {token.balance}
                </p>
            </div>
            <div className="text-right">
                <p className="text-lg text-frost-white" data-testid={`token-value-${token.symbol}`}>
                    ${token.value}
                </p>
                <p
                    className={`text-sm ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}
                    data-testid={`token-change-${token.symbol}`}
                >
                    {token.change24h}%
                </p>
            </div>
        </div>
        <div className="flex justify-center gap-4 mt-4">
            <Rune variant="secondary" className="w-32" data-testid={`send-button-${token.symbol}`}>
                Send
            </Rune>
            <Rune variant="secondary" className="w-32" data-testid={`receive-button-${token.symbol}`}>
                Receive
            </Rune>
        </div>
    </Shield>
);

const RecentActivity = ({ transactions }) => (
    <Shield title="RECENT ACTIVITY" variant="frost" data-testid="recent-activity">
        {transactions.map((tx, index) => (
            <div
                key={index}
                className="flex items-center justify-between p-3 border-b border-frost-white/20"
                data-testid={`transaction-${index}`}
            >
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
);

const PortfolioSummary = ({ tokens }) => (
    <Shield title="PORTFOLIO SUMMARY" variant="frost" data-testid="portfolio-summary">
        <div className="space-y-4">
            <div className="flex justify-between">
                <span className="text-frost-white">Total Value:</span>
                <span className="text-asgard-gold" data-testid="total-value">
                    ${tokens.reduce((sum, token) => sum + token.value, 0).toFixed(2)}
                </span>
            </div>
            <div className="flex justify-between">
                <span className="text-frost-white">24h Change:</span>
                <span
                    className={`${tokens.reduce((sum, token) => sum + token.change24h, 0) / tokens.length >= 0 ? 'text-green-400' : 'text-red-400'}`}
                    data-testid="total-change"
                >
                    {(tokens.reduce((sum, token) => sum + token.change24h, 0) / tokens.length).toFixed(1)}%
                </span>
            </div>
            <div className="flex justify-between">
                <span className="text-frost-white">Number of Assets:</span>
                <span className="text-frost-white" data-testid="asset-count">{tokens.length}</span>
            </div>
        </div>
    </Shield>
);

const Dashboard = () => {
    const {
        address,
        isConnected,
        isConnecting,
        connect,
        disconnect,
        chain,
        balance,
        isMetaMaskInstalled
    } = useWallet();

    // Add debugging logs
    useEffect(() => {
        console.log('Wallet state:', {
            isConnected,
            isConnecting,
            address,
            chain,
            isMetaMaskInstalled
        });
    }, [isConnected, isConnecting, address, chain, isMetaMaskInstalled]);

    const handleConnect = async () => {
        try {
            if (!isMetaMaskInstalled) {
                window.open('https://metamask.io', '_blank');
                return;
            }
            await connect();
        } catch (error) {
            console.error('Connection error:', error);
        }
    };

    const handleDisconnect = async () => {
        try {
            await disconnect();
        } catch (error) {
            console.error('Disconnect error:', error);
        }
    };

    if (!isMetaMaskInstalled) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Shield
                    title={
                        <TransitionText
                            runic="ᛁᚾᛋᛏᚨᛚᛚ ᛗᛖᛏᚨᛗᚨᛋᚲ"
                            english="INSTALL METAMASK"
                        />
                    }
                    variant="frost"
                    className="mb-8"
                >
                    <div className="text-center">
                        <p className="mb-4">You need to install MetaMask to access Valhalla's treasures.</p>
                        <Rune
                            variant="primary"
                            onClick={() => window.open('https://metamask.io', '_blank')}
                        >
                            INSTALL METAMASK
                        </Rune>
                    </div>
                </Shield>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Shield
                title={
                    <TransitionText
                        runic="ᚹᚨᛚᛚᛖᛏ ᚲᛟᚾᚾᛖᚲᛏᛁᛟᚾ"
                        english="WALLET CONNECTION"
                    />
                }
                variant={isConnected ? "gold" : "frost"}
                className="mb-8"
            >
                <div className="flex flex-col items-center gap-4">
                    {isConnected && address ? (
                        <>
                            <div className="text-center">
                                <p className="text-sm text-frost-white/70">Connected Account</p>
                                <p className="text-asgard-gold">{`${address.slice(0, 6)}...${address.slice(-4)}`}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-frost-white/70">Network</p>
                                <p className="text-bifrost-teal">{chain?.name || 'Unknown'}</p>
                            </div>
                            {balance && (
                                <div className="text-center">
                                    <p className="text-sm text-frost-white/70">Balance</p>
                                    <p className="text-asgard-gold">
                                        {`${parseFloat(balance?.formatted || '0').toFixed(4)} ${balance?.symbol || 'ETH'}`}
                                    </p>
                                </div>
                            )}
                            <Rune
                                variant="secondary"
                                onClick={handleDisconnect}
                                className="mt-4"
                            >
                                DISCONNECT
                            </Rune>
                        </>
                    ) : (
                        <>
                            <p className="text-center">
                                Connect your MetaMask to enter the realm of digital Valhalla
                            </p>
                            <Rune
                                variant="primary"
                                onClick={handleConnect}
                                disabled={isConnecting}
                            >
                                {isConnecting ? "CONNECTING..." : "CONNECT WALLET"}
                            </Rune>
                        </>
                    )}
                </div>
            </Shield>

            {isConnected && (
                <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {mockTokens.map((token, index) => (
                            <TokenCard key={index} token={token} />
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <RecentActivity transactions={mockTransactions} />
                        <PortfolioSummary tokens={mockTokens} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;