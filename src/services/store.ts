import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import ingredientsReducer from './reducers/ingredients-slice';
import constructorReducer from './reducers/constructor-slice';
import feedReducer from './reducers/feed-slice';
import ingredientDetailsReducer from './reducers/ingredient-details-slice';
import orderReducer from './reducers/order-slice';
import authReducer from './reducers/auth-slice';
import { socketMiddleware } from './middleware/middleware';

const wsActions = {
  wsOpen: 'feed/setWebsocketOpen',
  wsClose: 'feed/setWebsocketClose',
  wsConnect: 'feed/setWebsocketConnect',
  wsDisconnect: 'feed/setWebsocketDisconnect',
  wsMessage: 'feed/setWebsocketData',
  wsError: 'feed/setWebsocketError'
}

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
  feed: feedReducer,
  auth: authReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware().concat(socketMiddleware(wsActions))
});

export default store;
export type RootStore = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
