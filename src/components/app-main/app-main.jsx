import styles from './app-main.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import { selectIsOrderLoading } from '../../services/order-slice';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Loader from '../loader/loader';

const AppMain = () => {
  const isOrderLoading = useSelector(selectIsOrderLoading);
  return (
    <DndProvider backend={HTML5Backend}>
      <main className={`${styles.main} pb-10`}>
        <BurgerIngredients />
        { isOrderLoading ? <Loader /> : <BurgerConstructor /> }
      </main>
    </DndProvider>
  )
}

export default AppMain;
