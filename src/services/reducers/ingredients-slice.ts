import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsData } from '../../utils/api';
import { RootStore } from '../store';
import { TIngredient } from '../../utils/types';

type TState = {
  ingredients: TIngredient[],
  isLoading: boolean,
  error: {} | null
}

const initialState: TState = {
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
  extraReducers: builder => {
    builder
      .addCase(fetchIngredients.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload.data;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
        console.log(action.error);
      })
  }
});

export default ingredientsSlice.reducer;

export const selectIngredients = (state: RootStore) => state.ingredients.ingredients;
export const selectIsIngredientsLoading = (state: RootStore) => state.ingredients.isLoading;
export const selectLoadingError = (state: RootStore) => state.ingredients.error;
export const selectIngredientById = (id?: string) => (state: RootStore) => state.ingredients.ingredients.find(data => data._id === id);
