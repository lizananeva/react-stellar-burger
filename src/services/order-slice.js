import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postOrder } from '../utils/api';

const initialState = {
  order: {},
  isModalOpen: false,
  isLoading: false
}

export const postOrderDetails = createAsyncThunk('order/post', postOrder);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    hideOrder(state) {
      state.order = {};
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

export default orderSlice.reducer;

export const selectOrderNumber = state => state.order.order.number;
export const selectIsOrderModalOpen = state => state.order.isModalOpen;
export const selectIsOrderLoading = state => state.order.isLoading;
