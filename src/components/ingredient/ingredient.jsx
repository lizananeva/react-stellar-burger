import styles from './ingredient.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { removeIngredient, moveIngredient, selectConstructorIngredients } from '../../services/constructor-slice';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/prop-types';
import PropTypes from 'prop-types';

const Ingredient = ({ data, index }) => {
  const { name, price, image } = data;
  const ingredients = useSelector(selectConstructorIngredients);

  const dispatch = useDispatch();

  const findIndex = item => {
    return ingredients.indexOf(item);
  }

  const [{ isDragging }, dragRef] = useDrag({
    type: 'sort',
    item: { ingredient: data },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  });

  const [, dropRef] = useDrop({
    accept: 'sort',
    hover({ ingredient }) {
      if (ingredient._constId === data._constId) return;
      dispatch(
        moveIngredient({
          indexFrom: findIndex(ingredient),
          indexTo: index,
          ingredient: ingredient
        })
      );
    }
  });

  return (
    <li>
      <div className={`${styles.ingredient} ${isDragging && styles.dragged}`} ref={node => dropRef(dragRef(node))}>
        <DragIcon type='primary' />
        <ConstructorElement
            isLocked={false}
            text={name}
            price={price}
            thumbnail={image}
            handleClose={() => dispatch(removeIngredient(data))}
        />
      </div>
    </li>
  )
}

Ingredient.propTypes = {
  data: ingredientPropType.isRequired,
  index: PropTypes.number.isRequired
}

export default Ingredient;
