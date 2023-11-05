import styles from './ingredients-list.module.css';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Ingredient from '../ingredient/ingredient';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/prop-types';

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
      {fillings.map(filling => <Ingredient data={filling} key={filling._id}/>)}
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
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired
}

export default IngredientsList;
