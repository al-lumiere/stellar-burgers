import { FC, useEffect } from 'react';
import { AppHeaderUI } from '@ui';

import { userGet } from '../../slices/user-slice/user-slice';
import { useSelector, useDispatch } from '../../services/store';

export const AppHeader: FC = () => {
  const dispatch = useDispatch();

  const { user, isAuthChecked, isAuthenticated } = useSelector((s) => s.user);

  useEffect(() => {
    if (!isAuthChecked) {
      dispatch(userGet());
    }
  }, [dispatch, isAuthChecked]);

  return (
    <AppHeaderUI userName={user?.name} isAuthenticated={isAuthenticated} />
  );
};
