import { rootReducer } from './root-reducer';
import { test, describe, expect } from '@jest/globals';
import { initialState as FeedInState } from '../slices/feed-slice/feed-slice';
import { initialState as IngInState } from '../slices/ingredients-slice/ingredients-slice';
import { initialState as BurgerInState } from '../slices/burgerMake-slice/burgerMake-slice';
import { initialState as OrdersInState } from '../slices/orders-slice/orders-slice';
import { initialState as UserInState } from '../slices/user-slice/user-slice';
import { initialState as MakeOrderInState } from '../slices/makeOrder-slice/makeOrder-slice';
import { initialState as InfoOrderInState } from '../slices/infoOrder-slice/infoOrder-slice';

describe('RootReducer', () => {
  test('Checking initial state', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      feed: FeedInState,
      ingredients: IngInState,
      burgerMake: BurgerInState,
      orders: OrdersInState,
      user: UserInState,
      makeOrder: MakeOrderInState,
      infoOrder: InfoOrderInState
    });
  });
});
