import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userReset } from '../../slices/user-slice/user-slice';
import { useSelector, useDispatch } from '../../services/store';

import { ResetPasswordUI } from '@ui-pages';

export const ResetPassword: FC = () => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((s) => s.user);

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLocalError(null);

    try {
      await dispatch(userReset({ password, token })).unwrap();
      localStorage.removeItem('resetPassword');
      navigate('/login', { replace: true });
    } catch (err) {
      setLocalError('Ошибка смены пароля');
    }
  };

  return (
    <ResetPasswordUI
      errorText={localError || error || ''}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
