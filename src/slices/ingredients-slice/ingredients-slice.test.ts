import {
  ingredientsReducer,
  initialState as IngInState,
  fetchIngredients
} from './ingredients-slice';
import { test, describe, expect } from '@jest/globals';

const ing = [
  {
    _id: '1',
    id: '1',
    name: 'First',
    type: 'sauce',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 1,
    image: '',
    image_large: '',
    image_mobile: ''
  }
];

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
      payload: ing
    });
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(ing);
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
