import styles from './ingredients-list.module.css';
import React, { useMemo } from 'react';
import Ingredient from '../ingredient/ingredient';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const IngredientsList = ({ ingredients }) => {
  const bun = useMemo(() => ingredients.find(el => el.type === 'bun'), [ingredients]);
  const fillings = useMemo(() => ingredients.filter(el => el.type !== 'bun'), [ingredients]);

  return (
    <>
    <div className='pl-8 mb-4'>
      <ConstructorElement
        type='top'
        isLocked={true}
        text={`${bun.name} (верх)`}
        price={bun.price}
        thumbnail={bun.image}
      />
    </div>
    <ul className={`${styles.ingredients} pr-4 pl-4`}>
      {fillings.map((filling, index) => <Ingredient data={filling} key={index}/>)}
    </ul>
    <div className='pl-8 mt-4'>
      <ConstructorElement
        type='bottom'
        isLocked={true}
        text={`${bun.name} (низ)`}
        price={bun.price}
        thumbnail={bun.image}
      />
    </div>
    </>
  )
}

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  })).isRequired
}

export default IngredientsList;
