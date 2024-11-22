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
    CACHE_DURATION: 2 * 60 * 1000 // 2 minutes
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
                // Create mock prices for all tokens
                const mockPrices = {};
                tokens.forEach(token => {
                    mockPrices[token.symbol.toUpperCase()] = {
                        price: token.price || '0',
                        change24h: token.change24h || '0',
                        volume24h: '0',
                        history: token.history || []
                    };
                });

                // Set mock data immediately as fallback
                setPrices(mockPrices);

                // If in development, just use mock data
                if (process.env.NODE_ENV === 'development') {
                    console.log('Using mock data in development environment');
                    priceCache.data = mockPrices;
                    priceCache.timestamp = now;
                    return;
                }

                // Process tokens for API call
                const symbols = [...new Set(tokens.map(token => token.symbol.toUpperCase()))];
                const validIds = symbols
                    .map(symbol => TOKEN_ID_MAP[symbol])
                    .filter(Boolean);

                if (validIds.length > 0) {
                    // Optional: Attempt to fetch real data in background
                    // Uncomment and implement when ready for production
                    /*
                    const response = await fetch(`/api/prices?ids=${validIds.join(',')}`);
                    if (response.ok) {
                        const data = await response.json();
                        // Process real data and update prices
                        // Update cache
                        priceCache.data = processedData;
                        priceCache.timestamp = now;
                        setPrices(processedData);
                    }
                    */
                } else {
                    console.log('No valid token IDs found for API call');
                }

            } catch (err) {
                console.error('Error fetching price data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();
        const interval = setInterval(fetchPrices, 30000);
        return () => clearInterval(interval);
    }, [tokens]);

    return { prices, loading, error };
};