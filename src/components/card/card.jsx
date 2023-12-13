import styles from './card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { selectIngredientCount } from '../../services/constructor-slice';
import { showDetails } from '../../services/ingredient-details-slice';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/prop-types';

const Card = ({ ingredient }) => {
  const { image, name, price, _id } = ingredient;
  const ingredientCount = useSelector(state => selectIngredientCount(state, _id));

  const location = useLocation();
  const dispatch = useDispatch();

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
          {ingredientCount && <Counter count={ingredientCount} size='default' extraClass='m-1' />}
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

Card.propTypes = {
  ingredient: ingredientPropType.isRequired
}

export default Card;
