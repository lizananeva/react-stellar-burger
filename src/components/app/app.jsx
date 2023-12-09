import styles from './app.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsIngredientModalOpen, hideDetails } from '../../services/ingredient-details-slice';
import { selectIsOrderModalOpen, hideOrder } from '../../services/order-slice';
import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

const App = () => {
  const isIngredientModalOpen = useSelector(selectIsIngredientModalOpen);
  const isOrderModalOpen = useSelector(selectIsOrderModalOpen);

  const dispatch = useDispatch();

  return (
    <div className={styles.app}>
      <AppHeader />
      <AppMain />
      {isIngredientModalOpen && (
        <Modal title={'Детали ингредиента'} onCloseModal={() => dispatch(hideDetails())}>
          <IngredientDetails />
        </Modal>
      )}
      {isOrderModalOpen && (
        <Modal title={null} onCloseModal={() =>  dispatch(hideOrder())}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;
