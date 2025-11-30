import { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';

import { useDispatch } from '../../services/store';
import { userLogout } from '../../slices/user-slice/user-slice';

export const ProfileMenu: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const [busy, setBusy] = useState(false);

  const handleLogout = async () => {
    if (busy) return;

    try {
      setBusy(true);
      await dispatch(userLogout()).unwrap();
      navigate('/login', { replace: true, state: { from: { pathname } } });
    } catch {
    } finally {
      setBusy(false);
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
