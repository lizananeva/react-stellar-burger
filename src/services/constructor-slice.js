import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bun: {},
  ingredients: []
}

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      action.payload.type === 'bun'
        ? state.bun = action.payload
        : state.ingredients.push(action.payload)
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        ingredient => ingredient._constId !== action.payload._constId
      )
    },
    moveIngredient: (state, action) => {
      const { indexFrom, indexTo, ingredient } = action.payload;
      state.ingredients.splice(indexFrom, 1);
      state.ingredients.splice(indexTo, 0, ingredient);
    },
    eraseIngredients: state => {
      state.bun = {};
      state.ingredients = [];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  eraseIngredients
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;

export const selectConstructorIngredients = state => state.burgerConstructor.ingredients;
export const selectConstructorBun = state => state.burgerConstructor.bun;

export const selectIngredientCount = (state, id) => {
  return [...state.burgerConstructor.ingredients, state.burgerConstructor.bun]
    .filter(ingredient => ingredient._id === id)
    .length || undefined;
}

export const selectConstructorTotal = state => {
  return [...state.burgerConstructor.ingredients, state.burgerConstructor.bun]
    .reduce((sum, ingredient) =>
      !ingredient.type
        ? sum += 0
        : ingredient.type === 'bun'
          ? sum += ingredient.price * 2
          : sum += ingredient.price,
    0
  )
}

export const selectAllConstructorId = state => {
  return [...state.burgerConstructor.ingredients, state.burgerConstructor.bun]
    .map(ingredient => ingredient._id);
}
