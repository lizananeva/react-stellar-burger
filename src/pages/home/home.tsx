import { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppSelector } from '../../utils/hooks';
import { selectIsOrderLoading } from '../../services/reducers/order-slice';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Loader from '../../components/loader/loader';

const Home: FC = () => {
  const isOrderLoading = useAppSelector(selectIsOrderLoading);

  return (
    <DndProvider backend={HTML5Backend}>
      <BurgerIngredients />
      { isOrderLoading ? <Loader /> : <BurgerConstructor /> }
    </DndProvider>
  )
}

export default Home;
