import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postOrder } from '../../utils/api';
import { RootStore } from '../store';

type TState = {
  order: { ingredients: string[] | null, number: number | null },
  isModalOpen: boolean,
  isLoading: boolean
}

export const initialState: TState = {
  order: { ingredients: null, number: null },
  isModalOpen: false,
  isLoading: false
}

export const postOrderDetails = createAsyncThunk('order/post', postOrder);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    hideOrder(state) {
      state.order = { ingredients: null, number: null };
      state.isModalOpen = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(postOrderDetails.pending, state => {
        state.isLoading = true;
    })
      .addCase(postOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.order;
        state.isModalOpen = true;
    })
      .addCase(postOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.error);
    })
}});

export const { hideOrder } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;

export const selectOrderNumber = (state: RootStore) => state.order.order.number;
export const selectIsOrderModalOpen = (state: RootStore) => state.order.isModalOpen;
export const selectIsOrderLoading = (state: RootStore) => state.order.isLoading;
