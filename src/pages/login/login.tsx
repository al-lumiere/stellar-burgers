import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { userLogin } from '../../slices/user-slice';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, error } = useSelector((s) => s.user);

  useEffect(() => {
    if (isAuthenticated) {
      const to = location.state?.from?.pathname || '/profile';
      navigate(to, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(userLogin({ email, password })).unwrap();
      const to = location.state?.from || { pathname: '/' };
      navigate(to, { replace: true });
    } catch {}
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
