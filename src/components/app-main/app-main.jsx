import styles from './app-main.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const AppMain = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <main className={`${styles.main} pb-10`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </DndProvider>
  )
}

export default AppMain;
