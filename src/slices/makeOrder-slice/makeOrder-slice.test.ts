import {
  makeOrderReducer,
  initialState as MakeOrderInState,
  makeOrderFetch,
  clearOrder
} from './makeOrder-slice';
import { test, describe, expect } from '@jest/globals';
import { ord } from '../mocks';

describe('makeOrder-slice', () => {
  test('pending', () => {
    const state = makeOrderReducer(MakeOrderInState, {
      type: makeOrderFetch.pending.type
    });
    expect(state.isLoading).toBe(true);
  });

  test('fulfilled', () => {
    const stateBefore = {
      ...MakeOrderInState,
      isLoading: true
    };
    const state = makeOrderReducer(stateBefore, {
      type: makeOrderFetch.fulfilled.type,
      payload: ord.order
    });
    expect(state.isLoading).toBe(false);
    expect(state.order).toEqual(ord.order);
  });

  test('rejected', () => {
    const stateBefore = {
      ...MakeOrderInState,
      isLoading: true
    };

    const state = makeOrderReducer(stateBefore, {
      type: makeOrderFetch.rejected.type,
      error: 'Ошибка оформления заказа'
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual('Ошибка оформления заказа');
  });

  test('action clearOrder', () => {
    const stateBefore = {
      ...MakeOrderInState,
      order: ord.order
    };

    const state = makeOrderReducer(stateBefore, clearOrder());

    expect(state.order).toBe(null);
    expect(state.error).toBe(null);
    expect(state.isLoading).toBe(false);
  });
});
