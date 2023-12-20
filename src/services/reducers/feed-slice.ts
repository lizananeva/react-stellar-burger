import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersData } from '../../utils/api';
import { RootStore } from '../store';
import { TOrders } from '../../utils/types';

type TState = {
  orders: TOrders | null,
  wsOpen: boolean,
  wsConnect: boolean,
  wsUrl: string,
  wsError: string | null
}

const initialState: TState = {
  orders: null,
  wsOpen: false,
  wsConnect: true,
  wsUrl: '',
  wsError: null
}

export const fetchOrders = createAsyncThunk(
  'feed/fetch',
  getOrdersData
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setWebsocketOpen: (state, action: PayloadAction<boolean>) => {
      state.wsOpen = action.payload;
      state.wsError = null;
    },
    setWebsocketClose: state => {
      state.orders = null;
      state.wsOpen = false;
      state.wsUrl = '';
      state.wsError = null;
    },
    setWebsocketConnect: (state, action: PayloadAction<string>) => {
      state.wsConnect = true;
      state.wsUrl = action.payload;
    },
    setWebsocketDisconnect: state => {
      state.wsConnect = false;
    },
    setWebsocketData: (state, action: PayloadAction<TOrders>) => {
      state.orders = action.payload;
    },
    setWebsocketError: (state, action: PayloadAction<string | null>) => {
      state.wsError = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        console.log(action.error);
      })
  }
});

export const {
  setWebsocketOpen,
  setWebsocketClose,
  setWebsocketConnect,
  setWebsocketDisconnect,
  setWebsocketData,
  setWebsocketError
} = feedSlice.actions;

export default feedSlice.reducer;

export const selectOrders = (state: RootStore) => state.feed.orders;
export const selectTotal = (state: RootStore) => state.feed.orders?.total;
export const selectTotalToday = (state: RootStore) => state.feed.orders?.totalToday;
export const selectOrderByNumber = (id?: string) => (state: RootStore) =>
  state.feed.orders?.orders.find(order => order.number.toString() === id);
