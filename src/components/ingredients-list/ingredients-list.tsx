import styles from './ingredients-list.module.css';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectConstructorIngredients, selectConstructorBun } from '../../services/constructor-slice';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../ingredient/ingredient';
import { TIngredientWithId } from '../../utils/types';

const IngredientsList: FC = () => {
  const bun = useSelector(selectConstructorBun);
  const ingredients = useSelector(selectConstructorIngredients) as TIngredientWithId[];

  const hasBun: number = Object.keys(bun).length;

  return (
    <div className={styles.container}>
    { !!hasBun &&
      <ConstructorElement
        type='top'
        isLocked={true}
        text={`${bun.name} (верх)`}
        price={bun.price}
        thumbnail={bun.image}
        extraClass={`${styles.bun} ml-8`}
      />
    }
      <ul className={`${styles.ingredients} ${hasBun && styles.scroll} pr-4 pl-4`}>
        {ingredients.map((ingredient, index) => <Ingredient data={ingredient} index={index} key={ingredient._constId}/>)}
      </ul>
    { !!hasBun &&
      <ConstructorElement
        type='bottom'
        isLocked={true}
        text={`${bun.name} (низ)`}
        price={bun.price}
        thumbnail={bun.image}
        extraClass={`${styles.bun} ml-8`}
      />
    }
    </div>
  )
}

export default IngredientsList;
