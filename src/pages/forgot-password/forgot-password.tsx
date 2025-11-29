import { FC, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { userForgot } from '../../slices/user-slice';
import { useSelector, useDispatch } from '../../services/store';

import { ForgotPasswordUI } from '@ui-pages';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((s) => s.user);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLocalError(null);

    try {
      await dispatch(userForgot({ email })).unwrap();
      localStorage.setItem('resetPassword', 'true');
      navigate('/reset-password', { replace: true });
    } catch (err) {
      setLocalError('Ошибка отправки письма');
    }
  };

  return (
    <ForgotPasswordUI
      errorText={localError || error || ''}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
