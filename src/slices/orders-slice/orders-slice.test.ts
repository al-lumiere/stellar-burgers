import {
  ordersReducer,
  initialState as OrdersInState,
  fetchOrders
} from './orders-slice';
import { test, describe, expect } from '@jest/globals';

const ord = {
  orders: [
    {
      _id: '1',
      status: 'Ready',
      name: '',
      createdAt: '',
      updatedAt: '',
      number: 1,
      ingredients: []
    }
  ],
  isLoading: false,
  error: null
};

describe('orders-slice', () => {
  test('pending', () => {
    const state = ordersReducer(OrdersInState, {
      type: fetchOrders.pending.type
    });
    expect(state.isLoading).toBe(true);
  });

  test('fulfilled', () => {
    const stateBefore = {
      ...OrdersInState,
      isLoading: true
    };
    const state = ordersReducer(stateBefore, {
      type: fetchOrders.fulfilled.type,
      payload: ord.orders
    });
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(ord.orders);
  });

  test('rejected', () => {
    const stateBefore = {
      ...OrdersInState,
      isLoading: true
    };

    const state = ordersReducer(stateBefore, {
      type: fetchOrders.rejected.type,
      error: 'Ошибка загрузки'
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual('Ошибка загрузки');
  });
});
