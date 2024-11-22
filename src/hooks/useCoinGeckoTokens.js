import { useAccount, useBalance } from 'wagmi'
import { useState, useEffect } from 'react'
import { useTokenPrices } from './useTokenPrices'
import { mockTokens } from '../store/mockData'

export const useCoinGeckoTokens = () => {
    const { address, chain } = useAccount()
    const [baseTokens, setBaseTokens] = useState([])
    const [tokens, setTokens] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const isDev = process.env.NODE_ENV === 'development'

    const { data: nativeBalance } = useBalance({
        address,
        watch: true,
    })

    const { prices, loading: pricesLoading, error: pricesError } = useTokenPrices(baseTokens)

    const fetchTokenData = async () => {
        if (!address) {
            setIsLoading(false)
            setTokens([])
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            // Start with mock data in development
            let tokenData = isDev ? [...mockTokens] : []
            console.log('Initial token data:', tokenData)

            // Add native token if balance exists
            if (nativeBalance) {
                const existingEthToken = tokenData.find(t => t.symbol.toUpperCase() === nativeBalance.symbol.toUpperCase())
                if (!existingEthToken) {
                    tokenData.unshift({
                        symbol: nativeBalance.symbol.toUpperCase(),
                        name: chain?.name || 'Ethereum',
                        balance: nativeBalance.formatted,
                        price: '0',
                        value: '0',
                        change24h: '0',
                        logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
                        history: []
                    })
                } else {
                    existingEthToken.balance = nativeBalance.formatted
                }
            }

            console.log('Setting base tokens:', tokenData)
            setBaseTokens(tokenData)
        } catch (err) {
            console.error('Error fetching token data:', err)
            setError(err.message)
            // Use mock data as fallback
            setBaseTokens(mockTokens)
        } finally {
            setIsLoading(false)
        }
    }

    // Update tokens with real-time prices
    useEffect(() => {
        if (baseTokens.length > 0 && !pricesLoading && prices) {
            console.log('Updating tokens with prices:', prices)

            const updatedTokens = baseTokens.map(token => {
                const symbol = token.symbol.toUpperCase()
                const priceData = prices[symbol]

                console.log(`Processing token ${symbol}:`, { token, priceData })

                // Use mock price if CoinGecko price is not available
                const price = priceData?.price ?? token.price ?? '0'
                const balance = token.balance ?? '0'
                const change24h = priceData?.change24h ?? token.change24h ?? '0'

                // Calculate value using validated numbers
                const numericBalance = parseFloat(balance)
                const numericPrice = parseFloat(price)
                const value = (numericBalance * numericPrice).toFixed(2)

                return {
                    ...token,
                    price: price.toString(),
                    balance: balance.toString(),
                    value: value,
                    change24h: change24h.toString(),
                    history: priceData?.history || token.history || []
                }
            })

            console.log('Setting updated tokens:', updatedTokens)
            setTokens(updatedTokens)
        } else if (baseTokens.length > 0 && !pricesLoading && !prices) {
            // If no prices are available, use mock data
            console.log('No prices available, using mock data')
            setTokens(baseTokens)
        }
    }, [baseTokens, prices, pricesLoading])

    // Initial fetch and polling
    useEffect(() => {
        fetchTokenData()
        const interval = setInterval(fetchTokenData, 30000)
        return () => clearInterval(interval)
    }, [address, chain?.id, nativeBalance])

    return {
        tokens,
        isLoading: isLoading || pricesLoading,
        error: error || pricesError,
        refetch: fetchTokenData,
        isMockData: isDev
    }
}