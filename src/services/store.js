import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients-slice';
import constructorReducer from './constructor-slice';
import ingredientDetailsReducer from './ingredient-details-slice';
import orderReducer from './order-slice';
import authReducer from './auth-slice';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    order: orderReducer,
    auth: authReducer
  }
});

export default store;
