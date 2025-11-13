import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { fetchFeed } from '../../slices/feed-slice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const { orders, isLoading, error } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  if (error) {
    return <p>Ошибка загрузки: {error}</p>;
  }

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeed())} />
  );
};
