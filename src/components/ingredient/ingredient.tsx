import styles from './ingredient.module.css';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { useDrag, useDrop } from 'react-dnd';
import { removeIngredient, moveIngredient, selectConstructorIngredients } from '../../services/reducers/constructor-slice';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredientWithId } from '../../utils/types';

type TIngredientProps = {
  data: TIngredientWithId,
  index: number
}

const Ingredient: FC<TIngredientProps> = ({ data, index }) => {
  const { name, price, image } = data;
  const ingredients = useAppSelector(selectConstructorIngredients);

  const dispatch = useAppDispatch();

  const findIndex = (item: TIngredientWithId) => {
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
    hover({ ingredient }: { ingredient: TIngredientWithId }): void {
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

export default Ingredient;
