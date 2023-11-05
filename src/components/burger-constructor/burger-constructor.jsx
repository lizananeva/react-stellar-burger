import styles from './burger-constructor.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import IngredientsList from '../ingredients-list/ingredients-list';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/prop-types';

const BurgerConstructor = ({ data, openDetails }) => {
  return (
    <section className={`${styles.constructor} pt-25 pl-4`}>
      <form action='#'>
        <IngredientsList ingredients={data} />
        <div className={`${styles.order} pr-4 pl-4 mt-10`}>
          <div className={styles.total}>
            <p className='text text_type_digits-medium'>610</p>
            <CurrencyIcon type='primary' />
          </div>
          <Button htmlType='submit' type='primary' size='large' onClick={event => openDetails(event)}>
            Оформить заказ
          </Button>
        </div>
      </form>
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
  openDetails: PropTypes.func.isRequired
}

export default BurgerConstructor;
