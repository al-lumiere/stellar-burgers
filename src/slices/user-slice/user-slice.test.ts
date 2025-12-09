import {
  userReducer,
  initialState as UserInState,
  userRegister,
  userLogin,
  userGet,
  userUpdate,
  userLogout,
  userForgot,
  userReset
} from './user-slice';
import { test, describe, expect } from '@jest/globals';
import { us } from '../mocks';

describe('makeOrder-slice', () => {
  describe('userRegister', () => {
    test('pending', () => {
      const state = userReducer(UserInState, {
        type: userRegister.pending.type
      });
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('fulfilled', () => {
      const stateBefore = {
        ...UserInState,
        isLoading: true
      };
      const state = userReducer(stateBefore, {
        type: userRegister.fulfilled.type,
        payload: us
      });
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(us);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toEqual(true);
      expect(state.error).toBeNull();
    });

    test('rejected', () => {
      const stateBefore = {
        ...UserInState,
        isLoading: true
      };

      const state = userReducer(stateBefore, {
        type: userRegister.rejected.type,
        error: 'Ошибка регистрации'
      });
      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual('Ошибка регистрации');
      expect(state.isAuthenticated).toBe(false);
      expect(state.isAuthChecked).toEqual(true);
    });
  });

  describe('userLogin', () => {
    test('pending', () => {
      const state = userReducer(UserInState, {
        type: userLogin.pending.type
      });
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('fulfilled', () => {
      const stateBefore = {
        ...UserInState,
        isLoading: true
      };
      const state = userReducer(stateBefore, {
        type: userLogin.fulfilled.type,
        payload: us
      });
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(us);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toEqual(true);
      expect(state.error).toBeNull();
    });

    test('rejected', () => {
      const stateBefore = {
        ...UserInState,
        isLoading: true
      };

      const state = userReducer(stateBefore, {
        type: userLogin.rejected.type,
        error: 'Ошибка входа'
      });
      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual('Ошибка входа');
      expect(state.isAuthenticated).toBe(false);
      expect(state.isAuthChecked).toEqual(true);
    });
  });

  describe('userGet', () => {
    test('pending', () => {
      const state = userReducer(UserInState, {
        type: userGet.pending.type
      });
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('fulfilled', () => {
      const stateBefore = {
        ...UserInState,
        isLoading: true
      };
      const state = userReducer(stateBefore, {
        type: userGet.fulfilled.type,
        payload: us
      });
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(us);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toEqual(true);
      expect(state.error).toBeNull();
    });

    test('rejected', () => {
      const stateBefore = {
        ...UserInState,
        isLoading: true,
        user: us
      };

      const state = userReducer(stateBefore, {
        type: userGet.rejected.type,
        error: 'Ошибка'
      });
      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual('Ошибка');
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isAuthChecked).toEqual(true);
    });
  });

  describe('userUpdate', () => {
    test('pending', () => {
      const state = userReducer(UserInState, {
        type: userUpdate.pending.type
      });
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('fulfilled', () => {
      const stateBefore = {
        ...UserInState,
        isLoading: true,
        user: { email: 'mira@gmail.com', name: 'Mira' }
      };
      const state = userReducer(stateBefore, {
        type: userUpdate.fulfilled.type,
        payload: us
      });
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(us);
      expect(state.error).toBeNull();
    });

    test('rejected', () => {
      const stateBefore = {
        ...UserInState,
        isLoading: true
      };

      const state = userReducer(stateBefore, {
        type: userUpdate.rejected.type,
        error: 'Ошибка обновления'
      });
      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual('Ошибка обновления');
    });
  });

  describe('userLogout', () => {
    test('pending', () => {
      const state = userReducer(UserInState, {
        type: userLogout.pending.type
      });
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('fulfilled', () => {
      const stateBefore = {
        ...UserInState,
        isLoading: true,
        user: us,
        isAuthenticated: true,
        isAuthChecked: true
      };
      const state = userReducer(stateBefore, {
        type: userLogout.fulfilled.type
      });
      expect(state.isLoading).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isAuthChecked).toEqual(true);
      expect(state.error).toBeNull();
    });

    test('rejected', () => {
      const stateBefore = {
        ...UserInState,
        isLoading: true,
        user: us,
        isAuthenticated: true,
        isAuthChecked: true
      };

      const state = userReducer(stateBefore, {
        type: userLogout.rejected.type,
        error: 'Ошибка выхода'
      });
      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual('Ошибка выхода');
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isAuthChecked).toEqual(true);
    });
  });

  describe('userForgot', () => {
    test('pending', () => {
      const state = userReducer(UserInState, {
        type: userForgot.pending.type
      });
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('fulfilled', () => {
      const stateBefore = {
        ...UserInState,
        isLoading: true
      };
      const state = userReducer(stateBefore, {
        type: userForgot.fulfilled.type
      });
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    test('rejected', () => {
      const stateBefore = {
        ...UserInState,
        isLoading: true
      };

      const state = userReducer(stateBefore, {
        type: userForgot.rejected.type,
        error: 'Ошибка отправки письма'
      });
      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual('Ошибка отправки письма');
    });
  });

  describe('userReset', () => {
    test('pending', () => {
      const state = userReducer(UserInState, {
        type: userReset.pending.type
      });
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('fulfilled', () => {
      const stateBefore = {
        ...UserInState,
        isLoading: true
      };
      const state = userReducer(stateBefore, {
        type: userReset.fulfilled.type
      });
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    test('rejected', () => {
      const stateBefore = {
        ...UserInState,
        isLoading: true
      };

      const state = userReducer(stateBefore, {
        type: userReset.rejected.type,
        error: 'Ошибка смены пароля'
      });
      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual('Ошибка смены пароля');
    });
  });
});
