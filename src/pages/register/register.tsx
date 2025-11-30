import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { RegisterUI } from '@ui-pages';
import { userRegister } from '../../slices/user-slice/user-slice';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';

export const Register: FC = () => {
  const [name, setUserName] = useState('');
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
    if (!name.trim() || !email.trim() || password.length < 8) return;
    try {
      await dispatch(userRegister({ email, name, password })).unwrap();
      const to = location.state?.from || { pathname: '/' };
      navigate(to, { replace: true });
    } catch {}
  };

  return (
    <RegisterUI
      errorText={error || ''}
      email={email}
      userName={name}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
