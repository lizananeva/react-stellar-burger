import styles from './burger-constructor.module.css';
import { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../utils/hooks';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import { postOrderDetails, hideOrder, selectIsOrderModalOpen } from '../../services/reducers/order-slice';
import { selectUser } from '../../services/reducers/auth-slice';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as uuidv4 } from 'uuid';
import IngredientsList from '../ingredients-list/ingredients-list';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {
  addIngredient,
  eraseIngredients,
  selectConstructorBun,
  selectConstructorTotal,
  selectAllConstructorId
} from '../../services/reducers/constructor-slice';
import { TIngredient, TIngredientWithId } from '../../utils/types';

const BurgerConstructor: FC = () => {
  const constructorTotal = useAppSelector(selectConstructorTotal);
  const orderIds = useAppSelector(selectAllConstructorId);
  const hasBun: boolean = !!useAppSelector(selectConstructorBun);
  const user = useAppSelector(selectUser);
  const isOrderModalOpen = useAppSelector(selectIsOrderModalOpen);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [{ isDragging }, dropRef] = useDrop({
    accept: 'ingredient',
    drop(item: TIngredient) {
      const newItem: TIngredientWithId = { ...item, _constId: uuidv4() };
      dispatch(addIngredient(newItem));
    },
    collect: monitor => ({
      isDragging: monitor.isOver()
    })
  });

  const onPostOrder = () => {
    if (user) {
      dispatch(postOrderDetails({ingredients: orderIds}));
      dispatch(eraseIngredients());
    } else {
      navigate('/login');
    }
  }

  return (
  <>
    <section className={`${styles.constructor} pt-25 pl-4`}>
      <div className={isDragging ? styles.dragging : ''} ref={dropRef}>
        <IngredientsList />
      </div>
      <div className={`${styles.order} pr-4 pl-4 mt-10`}>
        <div className={styles.total}>
          <p className='text text_type_digits-medium'>{constructorTotal}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button
          htmlType='button'
          type='primary'
          size='large'
          onClick={onPostOrder}
          disabled={!hasBun}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
    {isOrderModalOpen && (
      <Modal title={null} onCloseModal={() => dispatch(hideOrder())}>
        <OrderDetails />
      </Modal>
    )}
</>
)}

export default BurgerConstructor;
