import { combineReducers } from '@reduxjs/toolkit';
import { feedReducer } from '../slices/feed-slice/feed-slice';
import { ingredientsReducer } from '../slices/ingredients-slice/ingredients-slice';
import { burgerMakeReducer } from '../slices/burgerMake-slice/burgerMake-slice';
import { ordersReducer } from '../slices/orders-slice/orders-slice';
import { userReducer } from '../slices/user-slice/user-slice';
import { makeOrderReducer } from '../slices/makeOrder-slice/makeOrder-slice';
import { infoOrderReducer } from '../slices/infoOrder-slice/infoOrder-slice';

export const rootReducer = combineReducers({
  feed: feedReducer,
  ingredients: ingredientsReducer,
  burgerMake: burgerMakeReducer,
  orders: ordersReducer,
  user: userReducer,
  makeOrder: makeOrderReducer,
  infoOrder: infoOrderReducer
});

export type RootState = ReturnType<typeof rootReducer>;
