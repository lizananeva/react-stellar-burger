import styles from './burger-constructor.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { postOrderDetails } from '../../services/order-slice';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as uuidv4 } from 'uuid';
import IngredientsList from '../ingredients-list/ingredients-list';
import {
  addIngredient,
  eraseIngredients,
  selectConstructorBun,
  selectConstructorTotal,
  selectAllConstructorId
} from '../../services/constructor-slice';

const BurgerConstructor = () => {
  const constructorTotal = useSelector(selectConstructorTotal);
  const orderIds = useSelector(selectAllConstructorId);
  const hasBun = Object.keys(useSelector(selectConstructorBun)).length;

  const dispatch = useDispatch();

  const [{ isDragging }, dropRef] = useDrop({
    accept: 'ingredient',
    drop(item) {
      const newItem = { ...item, _constId: uuidv4() };
      dispatch(addIngredient(newItem));
    },
    collect: monitor => ({
      isDragging: monitor.isOver()
    })
  });

  const onPostOrder = () => {
    dispatch(postOrderDetails({ingredients: orderIds}));
    dispatch(eraseIngredients());
  }

  return (
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
  )
}

export default BurgerConstructor;
