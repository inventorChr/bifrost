import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Dashboard from '../../pages/Dashboard';
import walletReducer from '../../store/slices/walletSlice';
import '@testing-library/jest-dom';

const createMockStore = (initialState) => {
    return configureStore({
        reducer: {
            wallet: walletReducer
        },
        preloadedState: {
            wallet: {
                isConnected: false,
                tokens: [],
                transactions: [],
                loading: {
                    connection: false,
                    tokens: false,
                    transactions: false
                },
                error: {
                    connection: null,
                    transaction: null,
                    tokens: null
                },
                lastConnectionAttempt: null,
                ...initialState
            }
        }
    });
};

describe('Dashboard Component', () => {
    test('renders connect wallet button when disconnected', () => {
        const store = createMockStore({});
        render(
            <Provider store={store}>
                <Dashboard />
            </Provider>
        );

        expect(screen.getByTestId('connect-wallet-button')).toHaveTextContent(/CONNECT WALLET/i);
        expect(screen.getByTestId('wallet-status')).toHaveTextContent(/Connect your wallet to begin your ascension/i);
    });

    test('shows connected state and portfolio data when connected', () => {
        const store = createMockStore({
            isConnected: true,
            tokens: [
                {
                    name: "Ethereum",
                    symbol: "ETH",
                    balance: "1.234",
                    value: 2468.12,
                    change24h: 5.2
                }
            ],
            transactions: [
                {
                    type: 'RECEIVE',
                    token: 'ETH',
                    amount: '1.0',
                    from: '0x1234...5678',
                    timestamp: '2024-03-20 09:15'
                }
            ]
        });

        render(
            <Provider store={store}>
                <Dashboard />
            </Provider>
        );

        // Basic UI elements
        expect(screen.getByTestId('connect-wallet-button')).toHaveTextContent('WALLET CONNECTED');
        expect(screen.getByTestId('wallet-status')).toHaveTextContent(/Your wallet is connected to the realms of Valhalla/i);

        // Token card elements
        expect(screen.getByTestId('token-symbol-ETH')).toHaveTextContent('ETH');
        expect(screen.getByTestId('token-balance-ETH')).toHaveTextContent('1.234');
        expect(screen.getByTestId('token-value-ETH')).toHaveTextContent('$2468.12');
        expect(screen.getByTestId('token-change-ETH')).toHaveTextContent('5.2%');

        // Portfolio summary
        expect(screen.getByTestId('portfolio-summary')).toBeInTheDocument();
        expect(screen.getByTestId('total-value')).toHaveTextContent('$2468.12');
        expect(screen.getByTestId('total-change')).toHaveTextContent('5.2%');
        expect(screen.getByTestId('asset-count')).toHaveTextContent('1');

        // Recent activity
        expect(screen.getByTestId('recent-activity')).toBeInTheDocument();
        expect(screen.getByTestId('transaction-0')).toHaveTextContent('RECEIVE');
        expect(screen.getByTestId('transaction-0')).toHaveTextContent('1.0 ETH');
        expect(screen.getByTestId('transaction-0')).toHaveTextContent('From: 0x1234...5678');
    });

    test('handles wallet connection', async () => {
        const store = createMockStore({});
        render(
            <Provider store={store}>
                <Dashboard />
            </Provider>
        );

        const connectButton = screen.getByTestId('connect-wallet-button');
        fireEvent.click(connectButton);

        const state = store.getState();
        expect(state.wallet.loading.connection).toBe(true);
    });

    test('shows cooldown message when trying to connect too soon', () => {
        const store = createMockStore({
            lastConnectionAttempt: Date.now() - 15000 // 15 seconds ago (within 30s cooldown)
        });

        render(
            <Provider store={store}>
                <Dashboard />
            </Provider>
        );

        expect(screen.getByTestId('cooldown-message')).toHaveTextContent(/Please wait before trying to connect again/i);
        expect(screen.getByTestId('connect-wallet-button')).toBeDisabled();
    });

    test('shows error message when connection fails', () => {
        const store = createMockStore({
            error: {
                connection: { message: 'Failed to connect wallet' },
                transaction: null,
                tokens: null
            }
        });

        render(
            <Provider store={store}>
                <Dashboard />
            </Provider>
        );

        expect(screen.getByText('Failed to connect wallet')).toBeInTheDocument();
        expect(screen.getByText('Try again')).toBeInTheDocument();
        expect(screen.getByText('Dismiss')).toBeInTheDocument();
    });
});