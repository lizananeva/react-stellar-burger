import styles from './ingredient-page.module.css';
import { FC } from 'react';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

const IngredientPage: FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} text text_type_main-large pt-30`}>
        Детали ингредиента
      </h1>
      <IngredientDetails />
    </div>
  )
}

export default IngredientPage;
