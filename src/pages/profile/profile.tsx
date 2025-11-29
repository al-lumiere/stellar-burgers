import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, ChangeEvent, useEffect, useState } from 'react';

import { userGet, userUpdate } from '../../slices/user-slice';
import { useSelector, useDispatch } from '../../services/store';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((s) => s.user);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (!user) {
      dispatch(userGet());
    }
  }, [dispatch, user]);

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        userUpdate({
          name: formValue.name,
          email: formValue.email,
          password: formValue.password
        })
      ).unwrap();
      setFormValue((p) => ({ ...p, password: '' }));
    } catch {
      console.error('Ошибка обновления профиля');
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
