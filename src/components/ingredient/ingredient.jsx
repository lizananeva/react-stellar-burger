import styles from './ingredient.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/prop-types';

const Ingredient = ({ data }) => {
  const { name, price, image } = data;

  return (
    <li className={styles.ingredient}>
      <DragIcon type='primary' />
      <ConstructorElement
          isLocked={false}
          text={name}
          price={price}
          thumbnail={image}
      />
    </li>
  )
}

Ingredient.propTypes = {
  data: ingredientPropType.isRequired
}

export default Ingredient;
