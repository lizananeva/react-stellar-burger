import styles from './order.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { useAppSelector } from '../../utils/hooks';
import { useLocation } from 'react-router-dom';
import { selectUser } from '../../services/reducers/auth-slice';
import { selectIngredients } from '../../services/reducers/ingredients-slice';
import { TOrder } from '../../utils/types';
import {
  setStatusClass,
  setStatusText,
  getIngredientsWithCount,
  getUniqueIngredients,
  getUniqueIngredientsWithCount,
  getOrderIngredients } from '../../utils/utils';

  type TOrderProps = {
  params: TOrder
}

const Order: FC<TOrderProps> = ({ params }) => {
  const {ingredients, status, name, createdAt, number } = params;

  const location = useLocation();
  const isProfile = location.pathname === '/profile/orders';

  const statusClass = setStatusClass(status);
  const statusText = setStatusText(status);

  const allIngredients = useAppSelector(selectIngredients);
  const user = useAppSelector(selectUser);

  const ingredientsWithCount = getIngredientsWithCount(ingredients, allIngredients);
  const uniqueIngredients = getUniqueIngredients(ingredients);
  const uniqueIngredientsWithCount = getUniqueIngredientsWithCount(uniqueIngredients, ingredientsWithCount);
  const orderIngredients = getOrderIngredients(uniqueIngredientsWithCount, allIngredients);

  const totalPrice = orderIngredients.reduce((total, ingredient) => {
    const ingredientCount = ingredient.type === 'bun' ? 2 : ingredient.count || 1;
    const price = ingredient.price || 0;
    return total + price * ingredientCount;
  }, 0);

  return (
    <article className={`${styles.order} p-6`}>
      <div className={styles.row}>
        <p className='text text_type_digits-default'>#{number}</p>
        <FormattedDate
          className='text text_type_main-default text_color_inactive'
          date={new Date(createdAt)}
        />
      </div>
      <div>
        <h2 className={`${styles.title} text text_type_main-medium`}>{name}</h2>
        { isProfile && user && <p className={`text text_type_main-default ${statusClass} mt-2`}>{statusText}</p> }
      </div>
      <div className={styles.row}>
        <ul className={styles.images}>
          {orderIngredients.slice(0, 6).map((ingredient, index) => (
            <li key={index} className={`${styles.ingredient} ${styles[`ingredient_${index}`]}`}>
              <img
                className={styles.image}
                src={ingredient?.image}
                alt={ingredient?.name}
              />
            </li>
          ))}
        </ul>
        <div className={`${styles.price} ml-6`}>
          <p className='text text_type_digits-default'>{totalPrice}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </article>
  )
}

export default Order;
