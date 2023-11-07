import styles from './ingredients-list.module.css';
import { useSelector } from 'react-redux';
import { selectConstructorIngredients, selectConstructorBun } from '../../services/constructor-slice';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../ingredient/ingredient';

const IngredientsList = () => {
  const bun = useSelector(selectConstructorBun);
  const ingredients = useSelector(selectConstructorIngredients);

  if (Object.keys(bun).length) {
    return (
      <div className={styles.container}>
        <ConstructorElement
          type='top'
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`${styles.bun} ml-8`}
        />
        <ul className={`${styles.ingredients} ${styles.scroll} pr-4 pl-4`}>
          {ingredients.map((ingredient, index) => <Ingredient data={ingredient} index={index} key={ingredient._constId}/>)}
        </ul>
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`${styles.bun} ml-8`}
        />
      </div>
      )}

      return (
        <div className={styles.container}>
          <ul className={`${styles.ingredients} ${ingredients.length && styles.scroll} pr-4 pl-4`}>
            {ingredients.map((ingredient, index) => <Ingredient data={ingredient} index={index} key={ingredient._constId}/>)}
          </ul>
        </div>
    )
}

export default IngredientsList;
