import { createConfig, http } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, base, sepolia } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

// Configure supported chains
export const chains = [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(process.env.NODE_ENV === 'development' ? [sepolia] : []),
]

// Create wagmi config
export const config = createConfig({
    chains,
    connectors: [
        metaMask({
            chains,
            shimDisconnect: true,
            shimChainChangedNavigate: true,
        }),
    ],
    transports: Object.fromEntries(
        chains.map(chain => [
            chain.id,
            http(
                chain.rpcUrls.default.http[0],
                {
                    timeout: 10_000,
                }
            )
        ])
    ),
})

// Export supported chain IDs
export const supportedChainIds = chains.map(chain => chain.id)

// Helper function to check if a chain is supported
export const isSupportedChain = (chainId) =>
    supportedChainIds.includes(chainId)