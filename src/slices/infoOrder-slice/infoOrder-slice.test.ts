import {
  infoOrderReducer,
  initialState as InfoOrderInState,
  infoOrderFetch,
  clearInfoOrder
} from './infoOrder-slice';
import { test, describe, expect } from '@jest/globals';
import { ord } from '../mocks';

describe('infoOrder-slice', () => {
  test('pending', () => {
    const state = infoOrderReducer(InfoOrderInState, {
      type: infoOrderFetch.pending.type
    });
    expect(state.isLoading).toBe(true);
  });

  test('fulfilled', () => {
    const stateBefore = {
      ...InfoOrderInState,
      isLoading: true
    };
    const state = infoOrderReducer(stateBefore, {
      type: infoOrderFetch.fulfilled.type,
      payload: ord.order
    });
    expect(state.isLoading).toBe(false);
    expect(state.order).toEqual(ord.order);
  });

  test('rejected', () => {
    const stateBefore = {
      ...InfoOrderInState,
      isLoading: true
    };

    const state = infoOrderReducer(stateBefore, {
      type: infoOrderFetch.rejected.type,
      error: 'Ошибка загрузки заказа'
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual('Ошибка загрузки заказа');
  });

  test('action clearInfoOrder', () => {
    const stateBefore = {
      ...InfoOrderInState,
      order: {
        _id: '1',
        status: 'Ready',
        name: '',
        createdAt: '',
        updatedAt: '',
        number: 1,
        ingredients: []
      },
      isLoading: false,
      error: null
    };

    const state = infoOrderReducer(stateBefore, clearInfoOrder());

    expect(state.order).toBe(null);
    expect(state.error).toBe(null);
    expect(state.isLoading).toBe(false);
  });
});
