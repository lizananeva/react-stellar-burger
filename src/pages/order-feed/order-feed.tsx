import styles from './order-feed.module.css';
import { useEffect, FC } from 'react';
import { useAppDispatch } from '../../utils/hooks';
import { useLocation } from 'react-router-dom';
import { setWebsocketConnect, setWebsocketDisconnect } from '../../services/reducers/feed-slice';
import { baseWss } from '../../utils/api';
import OrdersList from '../../components/orders-list/orders-list';
import OrdersTotal from '../../components/orders-total/orders-total';

const OrderFeed: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setWebsocketConnect(`${baseWss}/orders/all`));
    return () => {
      dispatch(setWebsocketDisconnect());
    }
  }, [location.pathname]);

  return (
    <div className={styles.wrapper}>
      <h1 className='text text_type_main-large mt-10 mb-5'>Лента заказов</h1>
      <div className={styles.container}>
        <OrdersList />
        <OrdersTotal />
      </div>
    </div>
  )
}

export default OrderFeed;
