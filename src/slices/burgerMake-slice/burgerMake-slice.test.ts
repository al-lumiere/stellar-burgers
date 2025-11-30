import {
  burgerMakeReducer,
  initialState as BurgerInState,
  addIngredient,
  removeIngredient,
  moveIngredient
} from './burgerMake-slice'
import { test, describe, expect } from '@jest/globals';

describe('burgerMake-slice', () => {
  test('action addIng', () => {
    const ing = {
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
    };

    const state = burgerMakeReducer(BurgerInState, addIngredient(ing));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe('1');
    expect(state.ingredients[0].type).toBe('sauce');
  });

  test('action removeIng', () => {
    const stateBefore = {
      ...BurgerInState,
      ingredients: [
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
        },
        {
          _id: '2',
          id: '2',
          name: 'Second',
          type: 'sauce',
          proteins: 1,
          fat: 1,
          carbohydrates: 1,
          calories: 1,
          price: 1,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        {
          _id: '3',
          id: '3',
          name: 'Third',
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
      ]
    };

    const state = burgerMakeReducer(stateBefore, removeIngredient('2'));

    expect(state.ingredients).toHaveLength(2);
    expect(state.ingredients.find((item) => item.id === '2')).toBeUndefined();
  });

  test('action moveIng', () => {
    const stateBefore = {
      ...BurgerInState,
      ingredients: [
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
        },
        {
          _id: '2',
          id: '2',
          name: 'Second',
          type: 'sauce',
          proteins: 1,
          fat: 1,
          carbohydrates: 1,
          calories: 1,
          price: 1,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        {
          _id: '3',
          id: '3',
          name: 'Third',
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
      ]
    };

    const state = burgerMakeReducer(
      stateBefore,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(state.ingredients.map((i) => i.id)).toEqual(['2', '1', '3']);
  });


});
