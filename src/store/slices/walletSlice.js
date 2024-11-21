// store/slices/walletSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockTokens, mockTransactions } from '../mockData';

const initialState = {
    isConnected: false,
    tokens: [],
    transactions: [],
    loading: {
        connection: false,
        tokens: false,
        transactions: false,
    },
    error: {
        connection: null,
        transaction: null,
    },
    lastConnectionAttempt: null,
};

export const connectWallet = createAsyncThunk(
    'wallet/connect',
    async (_, { rejectWithValue }) => {
        try {
            // Simulate wallet connection with potential failures
            return await new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Simulate random connection failures (20% chance)
                    if (Math.random() < 0.2) {
                        reject(new Error('Unable to connect to wallet. Please check if your wallet is unlocked.'));
                    }
                    resolve({ tokens: mockTokens, transactions: mockTransactions });
                }, 1000);
            });
        } catch (error) {
            return rejectWithValue({
                code: 'CONNECTION_ERROR',
                message: error.message || 'Failed to connect wallet',
            });
        }
    }
);

export const sendTransaction = createAsyncThunk(
    'wallet/sendTransaction',
    async ({ to, amount, token }, { rejectWithValue }) => {
        try {
            // Simulate transaction with potential failures
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (Math.random() < 0.1) {
                        reject(new Error('Transaction failed. Please try again.'));
                    }
                    resolve();
                }, 2000);
            });

            return {
                type: 'SEND',
                token,
                amount,
                to,
                timestamp: new Date().toISOString(),
            };
        } catch (error) {
            return rejectWithValue({
                code: 'TRANSACTION_ERROR',
                message: error.message || 'Transaction failed',
            });
        }
    }
);

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        disconnectWallet: (state) => {
            state.isConnected = false;
            state.tokens = [];
            state.transactions = [];
            state.error = { connection: null, transaction: null };
        },
        clearError: (state, action) => {
            const errorType = action.payload;
            state.error[errorType] = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Connect wallet cases
            .addCase(connectWallet.pending, (state) => {
                state.loading.connection = true;
                state.error.connection = null;
                state.lastConnectionAttempt = Date.now();
            })
            .addCase(connectWallet.fulfilled, (state, action) => {
                state.isConnected = true;
                state.tokens = action.payload.tokens;
                state.transactions = action.payload.transactions;
                state.loading.connection = false;
                state.error.connection = null;
            })
            .addCase(connectWallet.rejected, (state, action) => {
                state.loading.connection = false;
                state.error.connection = action.payload;
            })
            // Send transaction cases
            .addCase(sendTransaction.pending, (state) => {
                state.loading.transactions = true;
                state.error.transaction = null;
            })
            .addCase(sendTransaction.fulfilled, (state, action) => {
                state.transactions.unshift(action.payload);
                state.loading.transactions = false;
                state.error.transaction = null;
            })
            .addCase(sendTransaction.rejected, (state, action) => {
                state.loading.transactions = false;
                state.error.transaction = action.payload;
            });
    },
});

export const { disconnectWallet, clearError } = walletSlice.actions;
export default walletSlice.reducer;