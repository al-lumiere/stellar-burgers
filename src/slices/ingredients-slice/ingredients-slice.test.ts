import {
  ingredientsReducer,
  initialState as IngInState,
  fetchIngredients
} from './ingredients-slice';
import { test, describe, expect } from '@jest/globals';
import { ingredients } from '../mocks';

describe('ingredients-slice', () => {
  test('pending', () => {
    const state = ingredientsReducer(IngInState, {
      type: fetchIngredients.pending.type
    });
    expect(state.isLoading).toBe(true);
  });

  test('fulfilled', () => {
    const stateBefore = {
      ...IngInState,
      isLoading: true
    };
    const state = ingredientsReducer(stateBefore, {
      type: fetchIngredients.fulfilled.type,
      payload: ingredients
    });
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(ingredients);
  });

  test('rejected', () => {
    const stateBefore = {
      ...IngInState,
      isLoading: true
    };

    const state = ingredientsReducer(stateBefore, {
      type: fetchIngredients.rejected.type,
      error: 'Ошибка загрузки'
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual('Ошибка загрузки');
  });
});
