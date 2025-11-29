import { setCookie, deleteCookie } from './cookie';

export const saveTokens = (accessToken: string, refreshToken: string) => {
  const raw = accessToken || '';
  const token = raw.startsWith('Bearer ') ? raw.slice(7) : raw;
  setCookie('accessToken', token, { path: '/' });
  localStorage.setItem('refreshToken', refreshToken);
};

export const clearTokens = () => {
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
};
