import styles from './profile-history.module.css';
import { useEffect, FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../../utils/hooks';
import { useLocation, Link } from 'react-router-dom';
import { setWebsocketConnect, setWebsocketDisconnect, selectOrders } from '../../../services/reducers/feed-slice';
import { baseWss } from '../../../utils/api';
import OrdersList from '../../../components/orders-list/orders-list';

const ProfileHistory: FC = () => {
  const orders = useAppSelector(selectOrders);
  const accessToken = localStorage.getItem('accessToken')?.split('Bearer ')[1];

  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setWebsocketConnect(`${baseWss}/orders?token=${accessToken}`));
    return () => {
      dispatch(setWebsocketDisconnect());
    }
  }, [location.pathname]);

  return orders && orders.orders.length === 0
    ? (
      <div className='pt-4'>
        <p className='text text_type_main-medium text_color_inactive mb-8'>У Вас пока нет заказов</p>
        <Link to={`/`} className={`${styles.link} text text_type_main-medium`}>
          Желаете создать первый заказ?
        </Link>
      </div>
      )
    : (
        <div className={styles.wrapper}>
          <OrdersList />
        </div>
      )
}

export default ProfileHistory;
