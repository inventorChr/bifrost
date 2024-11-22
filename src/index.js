import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { store } from './store';
import { config } from './config/wagmi';
import './styles.css';

const queryClient = new QueryClient();
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <WagmiProvider config={config}>
                <Provider store={store}>
                    <ErrorBoundary>
                        <App />
                    </ErrorBoundary>
                </Provider>
            </WagmiProvider>
        </QueryClientProvider>
    </React.StrictMode>
);