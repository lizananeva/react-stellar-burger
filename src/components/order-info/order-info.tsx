import styles from './order-info.module.css';
import { useEffect, FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../utils/hooks';
import { useLocation, useParams } from 'react-router-dom';
import { selectOrders } from '../../services/reducers/feed-slice';
import { selectIngredients } from '../../services/reducers/ingredients-slice';
import { fetchOrders } from '../../services/reducers/feed-slice';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  setStatusClass,
  setStatusText,
  getIngredientsWithCount,
  getUniqueIngredients,
  getUniqueIngredientsWithCount,
  getOrderIngredients } from '../../utils/utils';

const OrderInfo: FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const background = location.state && location.state.background;

  const orders = useAppSelector(selectOrders);
  const allIngredients = useAppSelector(selectIngredients);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (location.pathname.startsWith('/feed') || location.pathname.startsWith('/profile')) {
      !background && id && dispatch(fetchOrders(id));
    }
  }, [location.pathname, background, dispatch, id]);

  const currentOrder = orders?.orders.find(order => order.number.toString() === id) || null;

  if (!currentOrder) return null;

  const statusClass = setStatusClass(currentOrder.status);
  const statusText = setStatusText(currentOrder.status);

  const ingredientsWithCount = getIngredientsWithCount(currentOrder.ingredients, allIngredients);
  const uniqueIngredients = getUniqueIngredients(currentOrder.ingredients);
  const uniqueIngredientsWithCount = getUniqueIngredientsWithCount(uniqueIngredients, ingredientsWithCount);
  const orderIngredients = getOrderIngredients(uniqueIngredientsWithCount, allIngredients);

  const totalPrice = orderIngredients.reduce((total, ingredient) => {
    const ingredientCount = ingredient.type === 'bun' ? 2 : ingredient.count || 1;
    const price = ingredient.price || 0;
    return total + price * ingredientCount;
  }, 0);

  return (
    <div className={background ? styles['modal-content'] : styles['full-page-content']}>
      <p className={`${background ? styles['modal-title'] : styles['full-page-title']} text text_type_digits-default mb-5`}>
        #{currentOrder.number}
      </p>
      <h2 className={`text text_type_main-medium ${background ? 'mb-2' : 'mb-4'}`}>{currentOrder.name}</h2>
      <p className={`text text_type_main-default mb-15 ${statusClass}`}>{statusText}</p>
      <p className='text text_type_main-medium mb-6'>Состав:</p>
      <ul className={`${styles.list} pr-6 mb-10`}>
        {orderIngredients.map(ingredient =>
          <li key={ingredient?._id}>
            <div className={styles.row}>
              <img className={styles.image} src={ingredient?.image} alt={ingredient?.name} />
              <p className={`${styles.name} text text_type_main-small`}>{ingredient?.name}</p>
              <div className={styles.total}>
                <p className='text text_type_digits-default mr-2'>
                  {`${ingredient.count} x ${ingredient.price}`}
                </p>
                <CurrencyIcon type='primary' />
              </div>
            </div>
          </li>
        )}
      </ul>
      <div className={styles.footer}>
        <FormattedDate
          date={new Date(currentOrder.createdAt)}
          className='text text_color_inactive text_type_main-default'
        />
        <div className={styles.total}>
          <p className='mr-2 text text_type_digits-default'>{totalPrice}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  )
}

export default OrderInfo;
