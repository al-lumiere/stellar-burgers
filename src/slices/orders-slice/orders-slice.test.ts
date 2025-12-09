import {
  ordersReducer,
  initialState as OrdersInState,
  fetchOrders
} from './orders-slice';
import { test, describe, expect } from '@jest/globals';
import { orders } from '../mocks'

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
      payload: orders.orders
    });
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(orders.orders);
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
