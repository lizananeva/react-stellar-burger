import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStore } from '../store';
import { TIngredient } from '../../utils/types';

type TState = {
  ingredient: TIngredient | null,
  isModalOpen: boolean,
}

export const initialState: TState = {
  ingredient: null,
  isModalOpen: false
}

const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    showDetails: (state, action: PayloadAction<TIngredient | null>) => {
      state.ingredient = action.payload;
      state.isModalOpen = true;
    },
    hideDetails: state => {
      state.ingredient = null;
      state.isModalOpen = false;
    }
  }
});

export const { showDetails, hideDetails } = ingredientDetailsSlice.actions;

export const ingredientDetailsReducer = ingredientDetailsSlice.reducer;

export const selectIngredientDetails = (state: RootStore) => state.ingredientDetails.ingredient;
export const selectIsIngredientModalOpen = (state: RootStore) => state.ingredientDetails.isModalOpen;
