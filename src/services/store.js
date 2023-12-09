import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients-slice';
import constructorReducer from './constructor-slice';
import ingredientDetailsReducer from './ingredient-details-slice';
import orderReducer from './order-slice';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    order: orderReducer
  }
});

export default store;
