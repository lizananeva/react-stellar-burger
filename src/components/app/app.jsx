import styles from './app.module.css';
import { useState, useEffect } from 'react';
import { url } from '../../utils/data';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

const App = () => {
  const [state, setState] = useState({ success: false, apiData: [] });
  const [ingredientDetails, setIngredientDetails] = useState({ isOpened: false, ingredient: null })
  const [orderDetails, setOrderDetails] = useState({ isOpened: false });

  useEffect(() => getIngredientsData(), []);

  const getIngredientsData = () => {
    return fetch(url)
      .then(res => {
        if ( res.ok) {
          return res.json();
        }
        setState({ success: false, ...state });
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(res => setState({ success: res.success, apiData: res.data }))
      .catch(console.error)
  }

  const openIngredientDetails = data => {
    setIngredientDetails({ isOpened: true, ingredient: data })
}

  const openOrderDetails = event => {
    event.preventDefault()
    setOrderDetails({ ...orderDetails, isOpened: true });
  }

  const closeAllModals = () => {
    setIngredientDetails({ ...ingredientDetails, isOpened: false });
    setOrderDetails({ ...orderDetails, isOpened: false });
  }

  return (
    <>
    <AppHeader />
    <main className={`${styles.main} pb-10`}>
      {state.success && (
        <BurgerIngredients data={state.apiData} openDetails={openIngredientDetails} />
      )}
      {state.success && (
        <BurgerConstructor data={state.apiData} openDetails={openOrderDetails} />
      )}
    </main>
    {ingredientDetails.isOpened && (
      <Modal title={'Детали ингредиента'} onCloseModal={closeAllModals}>
        <IngredientDetails  data={ingredientDetails.ingredient} />
      </Modal>
    )}
    {orderDetails.isOpened && (
      <Modal title={null} onCloseModal={closeAllModals}>
        <OrderDetails />
      </Modal>
    )}
    </>
  );
}

export default App;
