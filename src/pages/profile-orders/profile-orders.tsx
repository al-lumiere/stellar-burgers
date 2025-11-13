import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { Preloader } from '@ui';

import { useSelector, useDispatch } from '../../services/store';
import { fetchOrders } from '../../slices/orders-slice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (error) {
    return <p>Ошибка загрузки: {error}</p>;
  }

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
