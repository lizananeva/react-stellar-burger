import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsData } from '../utils/api';

const initialState = {
  ingredients: [],
  isLoading: false,
  error: null
}

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetch',
  getIngredientsData
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchIngredients.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload.data;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      console.log(action.error);
    });
  }
});

export default ingredientsSlice.reducer;

export const selectIngredients = state => state.ingredients.ingredients;
export const selectIsIngredientsLoading = state => state.ingredients.isLoading;
export const selectLoadingError = state => state.ingredients.error;
