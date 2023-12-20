import styles from './orders-total.module.css';
import { useMemo, FC } from 'react';
import { useAppSelector } from '../../utils/hooks';
import { selectOrders, selectTotal, selectTotalToday } from '../../services/reducers/feed-slice';

const OrdersTotal: FC = () => {
  const orders = useAppSelector(selectOrders);
  const total = useAppSelector(selectTotal);
  const totalToday = useAppSelector(selectTotalToday);

  const renderOrdersByStatus = (status: string) =>
    orders?.orders?.filter(order => order.status === status)
      .map(order => <li key={order._id}>{order.number}</li>)

  const ordersReady = useMemo(() => renderOrdersByStatus('done'), [orders]);
  const ordersInProgress = useMemo(() => renderOrdersByStatus('pending'), [orders]);

  return (
    <section className={styles.container}>
      <div className={styles.status}>
        <div className={styles.column}>
          <h2 className='text text_type_main-medium mb-6'>Готовы:</h2>
          <ul className={`${styles.list} text_type_digits-default text_color_success`}>
            {ordersReady}
          </ul>
        </div>
        <div className={styles.column}>
          <h2 className='text text_type_main-medium mb-6'>В работе:</h2>
          <ul className={`${styles.list} text_type_digits-default`}>
            {ordersInProgress}
          </ul>
        </div>
      </div>
      <div className={styles.adjustment}>
        <h2 className='text text_type_main-medium'>Выполнено за все время:</h2>
        <p className={`${styles.total} text text_type_digits-large`}>{total}</p>
      </div>
      <div>
        <h2 className='text text_type_main-medium'>Выполнено за сегодня:</h2>
        <p className={`${styles.total} text text_type_digits-large`}>{totalToday}</p>
      </div>
    </section>
  )
}

export default OrdersTotal;
