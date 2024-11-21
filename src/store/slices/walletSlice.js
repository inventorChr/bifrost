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
    error: null,
};

export const connectWallet = createAsyncThunk(
    'wallet/connect',
    async (_, { rejectWithValue }) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return { tokens: mockTokens, transactions: mockTransactions };
        } catch (error) {
            return rejectWithValue(error.message);
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
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(connectWallet.pending, (state) => {
                state.loading.connection = true;
                state.error = null;
            })
            .addCase(connectWallet.fulfilled, (state, action) => {
                state.isConnected = true;
                state.tokens = action.payload.tokens;
                state.transactions = action.payload.transactions;
                state.loading.connection = false;
            })
            .addCase(connectWallet.rejected, (state, action) => {
                state.loading.connection = false;
                state.error = action.payload;
            });
    },
});

export const { disconnectWallet } = walletSlice.actions;
export default walletSlice.reducer;