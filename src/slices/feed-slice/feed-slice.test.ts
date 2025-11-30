import {
  feedReducer,
  initialState as FeedInState,
  fetchFeed
} from './feed-slice';
import { test, describe, expect } from '@jest/globals';
import { orders } from '../mocks';

describe('feed-slice', () => {
  test('pending', () => {
    const state = feedReducer(FeedInState, {
      type: fetchFeed.pending.type
    });
    expect(state.isLoading).toBe(true);
  });

  test('fulfilled', () => {
    const stateBefore = {
      ...FeedInState,
      isLoading: true
    };
    const state = feedReducer(stateBefore, {
      type: fetchFeed.fulfilled.type,
      payload: orders
    });
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(orders.orders);
    expect(state.total).toEqual(orders.total);
    expect(state.totalToday).toEqual(orders.totalToday);
  });

  test('rejected', () => {
    const stateBefore = {
      ...FeedInState,
      isLoading: true
    };

    const state = feedReducer(stateBefore, {
      type: fetchFeed.rejected.type,
      error: 'Ошибка загрузки'
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual('Ошибка загрузки');
  });
});
