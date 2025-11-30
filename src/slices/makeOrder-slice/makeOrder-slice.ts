import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

export const makeOrderFetch = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: string }
>('makeOrder/makeOrder', async (ingredientIds, { rejectWithValue }) => {
  try {
    const data = await orderBurgerApi(ingredientIds);
    return data.order;
  } catch (err) {
    return rejectWithValue('Ошибка оформления заказа');
  }
});

type makeOrderState = {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

export const initialState: makeOrderState = {
  order: null,
  isLoading: false,
  error: null
};

const makeOrderSlice = createSlice({
  name: 'makeOrder',
  initialState,
  reducers: {
    clearOrder(state) {
      state.order = null;
      state.error = null;
      state.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrderFetch.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        makeOrderFetch.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.isLoading = false;
          state.order = action.payload;
        }
      )
      .addCase(makeOrderFetch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка оформления заказа';
      });
  }
});

export const { clearOrder } = makeOrderSlice.actions;
export const makeOrderReducer = makeOrderSlice.reducer;
