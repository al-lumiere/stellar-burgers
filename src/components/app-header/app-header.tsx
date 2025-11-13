import { FC, useEffect } from 'react';
import { AppHeaderUI } from '@ui';
import { useNavigate } from 'react-router-dom';

import { userGet } from '../../slices/user-slice';
import { useSelector, useDispatch } from '../../services/store';

export const AppHeader: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthChecked, isAuthenticated } = useSelector((s) => s.user);

  useEffect(() => {
    if (!isAuthChecked) {
      dispatch(userGet());
    }
  }, [dispatch, isAuthChecked]);

  const handleConstructorClick = () => navigate('/');
  const handleFeedClick = () => navigate('/feed');
  const handleProfileClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/profile');
    }
  };

  return (
    <AppHeaderUI
      userName={user?.name}
      onConstructorClick={handleConstructorClick}
      onFeedClick={handleFeedClick}
      onProfileClick={handleProfileClick}
    />
  );
};
