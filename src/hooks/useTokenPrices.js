import { useState, useEffect } from 'react';

const TOKEN_ID_MAP = {
    'ETH': 'ethereum',
    'LINK': 'chainlink',
    'UNI': 'uniswap',
    'AAVE': 'aave',
    'PEPE': 'pepe',
    'SHIB': 'shiba-inu',
    'MATIC': 'matic-network',
    'ARB': 'arbitrum',
    'OP': 'optimism',
    'HAMR': 'hammer',
};

// Cache mechanism to store prices
const priceCache = {
    data: {},
    timestamp: null,
    CACHE_DURATION: 30 * 1000 // 30 seconds
};

const generateMockHistory = (basePrice, volatility = 0.02) => {
    return Array(24).fill(0).map((_, i) => {
        const variation = basePrice * volatility * Math.sin(i / 3);
        return Number(basePrice) + variation;
    });
};

export const useTokenPrices = (tokens = []) => {
    const [prices, setPrices] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrices = async () => {
            if (tokens.length === 0) {
                setLoading(false);
                return;
            }

            // Check cache first
            const now = Date.now();
            if (priceCache.timestamp && (now - priceCache.timestamp) < priceCache.CACHE_DURATION) {
                console.log('Using cached price data');
                setPrices(priceCache.data);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const symbols = [...new Set(tokens.map(token => token.symbol.toUpperCase()))];
                const validIds = symbols
                    .map(symbol => TOKEN_ID_MAP[symbol])
                    .filter(Boolean)
                    .join(',');

                if (!validIds) {
                    console.log('No valid token IDs for API call');
                    return;
                }

                console.log('Fetching data for tokens:', validIds);

                // Fetch both current prices and market data
                const [priceResponse, marketResponse] = await Promise.all([
                    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${validIds}&vs_currencies=usd&include_24hr_change=true&include_24h_vol=true`, {
                        headers: {
                            'Accept': 'application/json',
                        }
                    }),
                    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${validIds}&sparkline=true&price_change_percentage=24h`, {
                        headers: {
                            'Accept': 'application/json',
                        }
                    })
                ]);

                if (!priceResponse.ok || !marketResponse.ok) {
                    console.error('API Error:', priceResponse.status, marketResponse.status);
                    return;
                }

                const [priceData, marketData] = await Promise.all([
                    priceResponse.json(),
                    marketResponse.json()
                ]);

                console.log('Received price data:', priceData);
                console.log('Received market data:', marketData);

                // Combine price and sparkline data
                const combinedData = {};
                symbols.forEach(symbol => {
                    const id = TOKEN_ID_MAP[symbol];
                    if (id && priceData[id]) {
                        const marketInfo = marketData.find(m => m.id === id);
                        const price = priceData[id].usd;

                        combinedData[symbol] = {
                            price: price.toString(),
                            change24h: (priceData[id].usd_24h_change || 0).toFixed(2),
                            volume24h: (priceData[id].usd_24h_vol || 0).toString(),
                            history: marketInfo?.sparkline_in_7d?.price || generateMockHistory(price)
                        };
                    } else {
                        // Fallback to mock data only if API doesn't have the token
                        const token = tokens.find(t => t.symbol.toUpperCase() === symbol);
                        combinedData[symbol] = {
                            price: token?.price || '0',
                            change24h: token?.change24h || '0',
                            volume24h: '0',
                            history: generateMockHistory(Number(token?.price) || 0)
                        };
                    }
                });

                console.log('Setting combined data:', combinedData);

                // Update cache and state
                priceCache.data = combinedData;
                priceCache.timestamp = now;
                setPrices(combinedData);

            } catch (err) {
                console.error('Error fetching price data:', err);
                setError(err.message);

                // Fallback to mock data on error
                const fallbackData = {};
                tokens.forEach(token => {
                    const symbol = token.symbol.toUpperCase();
                    fallbackData[symbol] = {
                        price: token.price || '0',
                        change24h: token.change24h || '0',
                        volume24h: '0',
                        history: generateMockHistory(Number(token.price) || 0)
                    };
                });
                setPrices(fallbackData);
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();
        const interval = setInterval(fetchPrices, 30000); // Poll every 30 seconds
        return () => clearInterval(interval);
    }, [tokens]);

    return { prices, loading, error };
};