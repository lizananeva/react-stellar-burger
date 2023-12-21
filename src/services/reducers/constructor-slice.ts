import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStore } from '../store';
import { TIngredientWithId } from '../../utils/types';

type TMoveAction = {
  indexFrom: number,
  indexTo: number,
  ingredient: TIngredientWithId
}

type TState = {
  bun: TIngredientWithId | null,
  ingredients: TIngredientWithId[]
}

export const initialState: TState = {
  bun: null,
  ingredients: []
}

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredientWithId>) => {
      action.payload.type === 'bun'
        ? state.bun = action.payload
        : state.ingredients.push(action.payload)
    },
    removeIngredient: (state, action: PayloadAction<TIngredientWithId>) => {
      state.ingredients = state.ingredients.filter(
        ingredient => ingredient._constId !== action.payload._constId
      )
    },
    moveIngredient: (state, action: PayloadAction<TMoveAction>) => {
      const { indexFrom, indexTo, ingredient } = action.payload;
      state.ingredients.splice(indexFrom, 1);
      state.ingredients.splice(indexTo, 0, ingredient);
    },
    eraseIngredients: state => {
      state.bun = null;
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

export const constructorReducer = burgerConstructorSlice.reducer;

export const selectConstructorIngredients = (state: RootStore) => state.burgerConstructor.ingredients;
export const selectConstructorBun = (state: RootStore) => state.burgerConstructor.bun;
export const selectAllIngredients = (state: RootStore) => [...state.burgerConstructor.ingredients, state.burgerConstructor.bun];

export const selectConstructorTotal = (state: RootStore) => {
  return [...state.burgerConstructor.ingredients, state.burgerConstructor.bun]
    .reduce((sum, ingredient) =>
      !ingredient?.type
        ? sum += 0
        : ingredient.type === 'bun'
          ? sum += ingredient.price * 2
          : sum += ingredient.price,
    0
  )
}

export const selectAllConstructorId = (state: RootStore) =>
  state.burgerConstructor.bun
    ? [...state.burgerConstructor.ingredients, state.burgerConstructor.bun].map(el => el._id)
    : [];
