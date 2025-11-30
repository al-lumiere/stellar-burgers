import {
  burgerMakeReducer,
  initialState as BurgerInState,
  addIngredient,
  removeIngredient,
  moveIngredient
} from './burgerMake-slice';
import { test, describe, expect } from '@jest/globals';
import { ing, ingredients } from '../mocks';

describe('burgerMake-slice', () => {
  test('action addIng', () => {
    const state = burgerMakeReducer(BurgerInState, addIngredient(ing));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe('1');
    expect(state.ingredients[0].type).toBe('sauce');
  });

  test('action removeIng', () => {
    const stateBefore = {
      ...BurgerInState,
      ingredients: ingredients
    };

    const state = burgerMakeReducer(stateBefore, removeIngredient('2'));

    expect(state.ingredients).toHaveLength(2);
    expect(state.ingredients.find((item) => item.id === '2')).toBeUndefined();
  });

  test('action moveIng', () => {
    const stateBefore = {
      ...BurgerInState,
      ingredients: ingredients
    };

    const state = burgerMakeReducer(
      stateBefore,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(state.ingredients.map((i) => i.id)).toEqual(['2', '1', '3']);
  });
});
