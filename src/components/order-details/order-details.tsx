import styles from './order-details.module.css';
import { FC } from 'react';
import acceptedImg from '../../images/done.svg';
import { useSelector } from 'react-redux';
import { selectOrderNumber } from '../../services/order-slice';

const OrderDetails: FC = () => {
  const orderNumber = useSelector(selectOrderNumber);

  return (
    <div className={styles.content}>
      <h3 className='text text_type_digits-large pt-20 mb-8'>{orderNumber}</h3>
      <p className='text text_type_main-medium'>идентификатор заказа</p>
      <img className={`${styles.image} mt-15 mb-15`} src={acceptedImg} alt='Ваш заказ принят' />
      <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive pb-20'>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails;
