import {
  feedReducer,
  initialState as FeedInState,
  fetchFeed
} from './feed-slice';
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
  total: 10,
  totalToday: 5,
  isLoading: false,
  error: null
};

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
      payload: ord
    });
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(ord.orders);
    expect(state.total).toEqual(ord.total);
    expect(state.totalToday).toEqual(ord.totalToday);
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
