import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

export const infoOrderFetch = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('infoOrder/infoOrder', async (number, { rejectWithValue }) => {
  try {
    const data = await getOrderByNumberApi(number);
    return data.orders[0];
  } catch {
    return rejectWithValue('Не удалось загрузить заказ');
  }
});

type infoOrderState = {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

export const initialState: infoOrderState = {
  order: null,
  isLoading: false,
  error: null
};

const infoOrderSlice = createSlice({
  name: 'infoOrder',
  initialState,
  reducers: {
    clearInfoOrder(state) {
      state.order = null;
      state.error = null;
      state.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(infoOrderFetch.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        infoOrderFetch.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.isLoading = false;
          state.order = action.payload;
        }
      )
      .addCase(infoOrderFetch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка загрузки заказа';
      });
  }
});

export const { clearInfoOrder } = infoOrderSlice.actions;
export const infoOrderReducer = infoOrderSlice.reducer;
