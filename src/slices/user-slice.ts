import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  forgotPasswordApi,
  resetPasswordApi,
  TRegisterData
} from '@api';
import { TUser } from '../utils/types';
import { setCookie } from '../utils/cookie';

type UserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

export const userRegister = createAsyncThunk(
  'user/registare',
  async (info: { email: string; name: string; password: string }) => {
    const data = await registerUserApi(info);
    return data as unknown as {
      accessToken: string;
      refreshToken: string;
      user: TUser;
    };
  }
);

export const userLogin = createAsyncThunk(
  'user/login',
  async (info: { email: string; password: string }) => {
    const data = await loginUserApi(info);
    return data as unknown as {
      accessToken: string;
      refreshToken: string;
      user: TUser;
    };
  }
);

export const userGet = createAsyncThunk(
  'user/get',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserApi();
      return data.user as TUser;
    } catch {
      return rejectWithValue('unauthorized');
    }
  }
);

export const userUpdate = createAsyncThunk(
  'user/update',
  async (patch: TRegisterData) => {
    const data = await updateUserApi(patch);
    return data.user as TUser;
  }
);

export const userLogout = createAsyncThunk('user/logout', async () => {
  await logoutApi();
});

export const userForgot = createAsyncThunk(
  'user/forgot',
  async (info: { email: string }) => {
    const data = await forgotPasswordApi(info);
    return data;
  }
);

export const userReset = createAsyncThunk(
  'user/reset',
  async (info: { password: string; token: string }) => {
    const data = await resetPasswordApi(info);
    return data;
  }
);

export const checkAuth = userGet;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        userRegister.fulfilled,
        (
          state,
          action: PayloadAction<{
            accessToken: string;
            refreshToken: string;
            user: TUser;
          }>
        ) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.isAuthenticated = true;
          state.isAuthChecked = true;
          const raw = action.payload.accessToken || '';
          const token = raw.startsWith('Bearer ') ? raw.slice(7) : raw;
          setCookie('accessToken', token, { path: '/' });
          localStorage.setItem('refreshToken', action.payload.refreshToken);
        }
      )
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка регистрации';
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      });

    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        userLogin.fulfilled,
        (
          state,
          action: PayloadAction<{
            accessToken: string;
            refreshToken: string;
            user: TUser;
          }>
        ) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.isAuthenticated = true;
          state.isAuthChecked = true;
          const raw = action.payload.accessToken || '';
          const token = raw.startsWith('Bearer ') ? raw.slice(7) : raw;
          setCookie('accessToken', token, { path: '/' });
          localStorage.setItem('refreshToken', action.payload.refreshToken);
        }
      )
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка входа';
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      });

    builder
      .addCase(userGet.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userGet.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(userGet.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.error.message || 'Ошибка';
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      });

    builder
      .addCase(userUpdate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userUpdate.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка обновления';
      });

    builder
      .addCase(userLogout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.isLoading = false;
        setCookie('accessToken', '', { 'max-age': -1, path: '/' });
        localStorage.removeItem('refreshToken');
        state.user = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка выхода';
      });

    builder
      .addCase(userForgot.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userForgot.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(userForgot.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка отправки письма';
      });

    builder
      .addCase(userReset.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userReset.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(userReset.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка смены пароля';
      });
  }
});

export const userReducer = userSlice.reducer;
