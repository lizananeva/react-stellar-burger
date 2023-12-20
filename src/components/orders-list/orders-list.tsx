import styles from './orders-list.module.css';
import { FC } from 'react';
import { useAppSelector } from '../../utils/hooks';
import { useLocation, Link } from 'react-router-dom';
import { selectOrders } from '../../services/reducers/feed-slice';
import Order from '../order/order';

const OrdersList: FC = () => {
  const orders = useAppSelector(selectOrders);
  const location = useLocation();

  const setPathname = (number: number) => location.pathname.startsWith('/profile')
    ? `/profile/orders/${number}`
    : `/feed/${number}`;

  return (
    <section className={styles.feed}>
      <ul className={styles.orders}>
        {orders?.orders.map(order => (
          <li className='mb-4' key={order.number}>
            <Link
              to={{pathname: setPathname(order.number)}}
              state={{background: location}}
              className={styles.link}
            >
              <Order params={order}/>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default OrdersList;
