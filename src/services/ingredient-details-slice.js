import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ingredient: {},
  isModalOpen: false
}

const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    showDetails: (state, action) => {
      state.ingredient = action.payload;
      state.isModalOpen = true;
    },
    hideDetails: state => {
      state.ingredient = {};
      state.isModalOpen = false;
    }
  }
});

export const { showDetails, hideDetails } = ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;

export const selectIngredientDetails = state => state.ingredientDetails.ingredient;
export const selectIsIngredientModalOpen = state => state.ingredientDetails.isModalOpen;
