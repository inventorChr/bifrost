import React from 'react';
import { useWallet } from '../hooks/useWallet';
import { useCoinGeckoTokens } from '../hooks/useCoinGeckoTokens';
import TokenChart from "../components/TokenChart";
import Shield from '../components/Shield';
import Rune from '../components/Rune';
import TransitionText from '../components/TransitionText';

const TokenCard = ({ token }) => {
    // Early return with loading state if token is empty
    if (!token) {
        return (
            <Shield
                title="Loading..."
                variant="frost"
                className="relative"
            >
                <div className="animate-pulse">Loading token data...</div>
            </Shield>
        );
    }

    // Validate and format token data with fallbacks
    const {
        name = 'Unknown Token',
        symbol = '',
        balance = '0',
        price = '0',
        value = '0',
        change24h = '0',
        logo = '',
        history = []
    } = token;

    // Format numerical values with proper parsing
    const formattedBalance = parseFloat(balance).toLocaleString(undefined, {
        maximumFractionDigits: 4
    });

    const formattedPrice = parseFloat(price).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
    });

    const formattedValue = parseFloat(value).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const formattedChange = parseFloat(change24h).toFixed(2);
    const isPositiveChange = parseFloat(change24h) >= 0;

    // Debug logging
    console.log('TokenCard Render:', {
        name,
        symbol,
        balance: formattedBalance,
        price: formattedPrice,
        value: formattedValue,
        change24h: formattedChange
    });

    return (
        <Shield
            title={name}
            variant="frost"
            className="relative"
            data-testid={`token-card-${symbol}`}
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-xl font-bold text-asgard-gold" data-testid={`token-symbol-${symbol}`}>
                        {symbol}
                    </p>
                    <p className="text-lg text-frost-white" data-testid={`token-balance-${symbol}`}>
                        {formattedBalance} {symbol}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-frost-white/70 mb-1">Price per token:</p>
                    <p className="text-lg text-frost-white" data-testid={`token-price-${symbol}`}>
                        ${formattedPrice}
                    </p>
                    <p className="text-sm text-frost-white/70 mt-2 mb-1">Total Value:</p>
                    <p className="text-lg text-frost-white" data-testid={`token-value-${symbol}`}>
                        ${formattedValue}
                    </p>
                    <p
                        className={`text-sm ${isPositiveChange ? 'text-green-400' : 'text-red-400'}`}
                        data-testid={`token-change-${symbol}`}
                    >
                        {isPositiveChange ? '+' : ''}{formattedChange}%
                    </p>
                </div>
            </div>

            {logo && (
                <img
                    src={logo}
                    alt={`${symbol} logo`}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full"
                    onError={(e) => {
                        e.target.style.display = 'none';
                    }}
                />
            )}

            {history && history.length > 0 && (
                <TokenChart
                    data={history}
                    change24h={parseFloat(change24h)}
                />
            )}

            <div className="flex justify-center gap-4 mt-4">
                <Rune
                    variant="secondary"
                    className="w-32"
                    data-testid={`send-button-${symbol}`}
                >
                    Send
                </Rune>
                <Rune
                    variant="secondary"
                    className="w-32"
                    data-testid={`receive-button-${symbol}`}
                >
                    Receive
                </Rune>
            </div>
        </Shield>
    );
};

const RecentActivity = ({ transactions = [] }) => (
    <Shield title="RECENT ACTIVITY" variant="frost" data-testid="recent-activity">
        {transactions.length > 0 ? transactions.map((tx, index) => (
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
        )) : (
            <div className="text-center text-frost-white/70 py-4">
                No recent transactions
            </div>
        )}
    </Shield>
);

const WalletSummaryLayout = ({
                                 address,
                                 chain,
                                 disconnect,
                                 tokens = []
                             }) => {
    // Calculate portfolio metrics
    const totalValue = tokens.reduce((sum, token) => sum + parseFloat(token.value || 0), 0);
    const averageChange = tokens.length > 0
        ? tokens.reduce((sum, token) => sum + (parseFloat(token.change24h) || 0), 0) / tokens.length
        : 0;

    // Calculate highest and lowest performing assets
    const sortedByChange = [...tokens].sort((a, b) => parseFloat(b.change24h) - parseFloat(a.change24h));
    const bestPerformer = sortedByChange[0];
    const worstPerformer = sortedByChange[sortedByChange.length - 1];

    // Calculate largest holdings
    const sortedByValue = [...tokens].sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
    const largestHolding = sortedByValue[0];

    return (
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 mb-8">
            <Shield
                variant="gold"
                className="h-full p-4 flex justify-center items-center"
            >
                <div className="flex flex-col items-center gap-3">
                    <div className="text-center">
                        <p className="text-sm text-frost-white/70">Connected Account</p>
                        <p className="text-asgard-gold">{`${address.slice(0, 6)}...${address.slice(-4)}`}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-frost-white/70">Network</p>
                        <p className="text-bifrost-teal">{chain?.name || 'Unknown'}</p>
                    </div>
                    <Rune variant="secondary" onClick={disconnect} className="px-6">
                        DISCONNECT
                    </Rune>
                </div>
            </Shield>

            <Shield
                title="PORTFOLIO ANALYTICS"
                variant="frost"
                className="h-fit"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    <div className="space-y-3">
                        <h3 className="text-asgard-gold font-semibold mb-2">Overview</h3>
                        <div className="flex justify-between">
                            <span className="text-frost-white">Total Value:</span>
                            <span className="text-asgard-gold">
                ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-frost-white">24h Change:</span>
                            <span className={averageChange >= 0 ? 'text-green-400' : 'text-red-400'}>
                {averageChange.toFixed(2)}%
              </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-frost-white">Total Assets:</span>
                            <span className="text-frost-white">{tokens.length}</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-asgard-gold font-semibold mb-2">Performance</h3>
                        {bestPerformer && (
                            <div className="flex justify-between">
                                <span className="text-frost-white">Best Performer:</span>
                                <span className="text-green-400">
                  {bestPerformer.symbol} ({parseFloat(bestPerformer.change24h).toFixed(2)}%)
                </span>
                            </div>
                        )}
                        {worstPerformer && (
                            <div className="flex justify-between">
                                <span className="text-frost-white">Worst Performer:</span>
                                <span className="text-red-400">
                  {worstPerformer.symbol} ({parseFloat(worstPerformer.change24h).toFixed(2)}%)
                </span>
                            </div>
                        )}
                        {largestHolding && (
                            <div className="flex justify-between">
                                <span className="text-frost-white">Largest Holding:</span>
                                <span className="text-bifrost-teal">
                  {largestHolding.symbol} (${parseFloat(largestHolding.value).toLocaleString()})
                </span>
                            </div>
                        )}
                    </div>
                </div>
            </Shield>
        </div>
    );
};

const Dashboard = () => {
    const {
        address,
        isConnected,
        isConnecting,
        connect,
        disconnect,
        chain,
        isMetaMaskInstalled
    } = useWallet();

    const { tokens, isLoading, error, refetch, isMockData } = useCoinGeckoTokens();

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
            {!isConnected ? (
                <Shield
                    title={
                        <TransitionText
                            runic="ᚹᚨᛚᛚᛖᛏ ᚲᛟᚾᚾᛖᚲᛏᛁᛟᚾ"
                            english="WALLET CONNECTION"
                        />
                    }
                    variant="frost"
                    className="mb-8"
                >
                    <div className="text-center">
                        <p className="mb-4">Connect your MetaMask to enter the realm of digital Valhalla</p>
                        <Rune
                            variant="primary"
                            onClick={connect}
                            disabled={isConnecting}
                        >
                            {isConnecting ? "CONNECTING..." : "CONNECT WALLET"}
                        </Rune>
                    </div>
                </Shield>
            ) : (
                <>
                    <WalletSummaryLayout
                        address={address}
                        chain={chain}
                        disconnect={disconnect}
                        tokens={tokens}
                    />

                    {isMockData && (
                        <Shield variant="frost" className="mb-6">
                            <div className="text-bifrost-teal p-4 flex items-center justify-between">
                                <span>🔧 Using mock token data for development</span>
                                <Rune
                                    variant="secondary"
                                    className="ml-4"
                                    onClick={refetch}
                                >
                                    Refresh
                                </Rune>
                            </div>
                        </Shield>
                    )}

                    {error && !isMockData && (
                        <Shield variant="frost" className="mb-6">
                            <div className="text-red-400 p-4 flex items-center justify-between">
                                <span>Error loading tokens: {error}</span>
                                <Rune
                                    variant="secondary"
                                    className="ml-4"
                                    onClick={refetch}
                                >
                                    Retry
                                </Rune>
                            </div>
                        </Shield>
                    )}

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {isLoading ? (
                            <div className="col-span-full text-center text-frost-white">
                                <div className="animate-pulse">Loading tokens...</div>
                            </div>
                        ) : tokens.length > 0 ? (
                            tokens.map((token, index) => (
                                <TokenCard key={`${token.symbol}-${index}`} token={token} />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-frost-white">
                                No tokens found in this wallet
                            </div>
                        )}
                    </div>

                    {tokens.length > 0 && (
                        <div className="grid md:grid-cols-2 gap-6">
                            <RecentActivity transactions={[]} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Dashboard;