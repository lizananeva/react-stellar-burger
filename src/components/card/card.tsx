import styles from './card.module.css';
import { useMemo, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { useLocation, Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { selectAllIngredients } from '../../services/reducers/constructor-slice';
import { showDetails } from '../../services/reducers/ingredient-details-slice';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../utils/types';

type TCardProps = {
  ingredient: TIngredient
}

const Card: FC<TCardProps> = ({ ingredient }) => {
  const { image, name, price, _id } = ingredient;
  const ingredients = useAppSelector(selectAllIngredients);
  const ingredientCount = useMemo(() => {
    return ingredients.filter(element => element?._id === _id).length
  }, [ingredients]);

  const location = useLocation();
  const dispatch = useAppDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <li>
      <Link
        to={`ingredients/${ingredient._id}`}
        state={{background: location}}
        key={ingredient._id}
        onClick={() => dispatch(showDetails(ingredient))}
        className={styles.link}
      >
        <article ref={dragRef} className={`${styles.card} ${isDragging && styles.dragged}`}>
          {!!ingredientCount && <Counter count={ingredientCount} size='default' extraClass='m-1' />}
          <img src={image} alt={name} className={`${styles.image} pr-4 pl-4 mb-2`} />
          <div className={`${styles.price} mb-2`}>
            <p className='text text_type_digits-default mr-2'>{price}</p>
            <CurrencyIcon type='primary' />
          </div>
          <h3 className={`${styles.name} text text_type_main-default`}>{name}</h3>
        </article>
      </Link>
    </li>
  )
}

export default Card;
