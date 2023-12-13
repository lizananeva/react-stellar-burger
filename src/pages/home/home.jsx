import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import { selectIsOrderLoading } from '../../services/order-slice';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Loader from '../../components/loader/loader';

const Home = () => {
  const isOrderLoading = useSelector(selectIsOrderLoading);

  return (
    <DndProvider backend={HTML5Backend}>
      <BurgerIngredients />
      { isOrderLoading ? <Loader /> : <BurgerConstructor /> }
    </DndProvider>
  )
}

export default Home;
