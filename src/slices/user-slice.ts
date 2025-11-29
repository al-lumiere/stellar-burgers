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
import { saveTokens, clearTokens } from '../utils/auth';

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

export const userRegister = createAsyncThunk<
  TUser,
  { email: string; name: string; password: string },
  { rejectValue: string }
>('user/register', async (info, { rejectWithValue }) => {
  try {
    const data = await registerUserApi(info);
    const { accessToken, refreshToken, user } = data as {
      accessToken: string;
      refreshToken: string;
      user: TUser;
    };

    saveTokens(accessToken, refreshToken);
    return user;
  } catch (e) {
    return rejectWithValue('Ошибка регистрации');
  }
});

export const userLogin = createAsyncThunk<
  TUser,
  { email: string; password: string },
  { rejectValue: string }
>('user/login', async (info, { rejectWithValue }) => {
  try {
    const data = await loginUserApi(info);
    const { accessToken, refreshToken, user } = data as {
      accessToken: string;
      refreshToken: string;
      user: TUser;
    };

    saveTokens(accessToken, refreshToken);
    return user;
  } catch (e) {
    return rejectWithValue('Ошибка входа');
  }
});

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

export const userLogout = createAsyncThunk<void, void, { rejectValue: string }>(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
    } catch (e) {
      return rejectWithValue('Ошибка выхода');
    } finally {
      clearTokens();
    }
  }
);

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
        (state, action: PayloadAction<TUser>) => {
          state.isLoading = false;
          state.user = action.payload;
          state.isAuthenticated = true;
          state.isAuthChecked = true;
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
      .addCase(userLogin.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
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
        state.user = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка выхода';
        state.user = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
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
