import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '../../utils/types';
import { makeOrderFetch } from '../makeOrder-slice/makeOrder-slice';

type ConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const burgerMakeSlice = createSlice({
  name: 'maker',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      const ingredient = action.payload;

      if (ingredient.type === 'bun') {
        state.bun = ingredient;
      } else {
        state.ingredients.push(ingredient);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const [moved] = state.ingredients.splice(fromIndex, 1);
      state.ingredients.splice(toIndex, 0, moved);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(makeOrderFetch.fulfilled, (state) => {
      state.bun = null;
      state.ingredients = [];
    });
  }
});

export const { addIngredient, removeIngredient, moveIngredient } =
  burgerMakeSlice.actions;

export const burgerMakeReducer = burgerMakeSlice.reducer;
