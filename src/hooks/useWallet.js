import { useAccount, useConnect, useDisconnect, useBalance, useChainId } from 'wagmi'
import { metaMask } from 'wagmi/connectors'
import { chains } from '../config/wagmi'

export const useWallet = () => {
    const { address, isConnected } = useAccount()
    const chainId = useChainId()
    const { connectAsync, status } = useConnect()
    const { disconnect } = useDisconnect()
    const { data: balance } = useBalance({
        address,
        watch: true,
    })

    const isMetaMaskInstalled = typeof window !== 'undefined' &&
        typeof window.ethereum !== 'undefined'

    // Get chain info based on chainId
    const chain = chains.find(c => c.id === chainId) || null

    const connect = async () => {
        try {
            await connectAsync({ connector: metaMask() })
        } catch (error) {
            console.error('Failed to connect:', error)
        }
    }

    return {
        address,
        isConnected,
        isConnecting: status === 'connecting',
        connect,
        disconnect,
        chain,
        balance,
        isMetaMaskInstalled,
    }
}

export default useWallet