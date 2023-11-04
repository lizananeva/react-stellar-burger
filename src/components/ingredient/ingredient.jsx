import styles from './ingredient.module.css';
import React from 'react';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

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
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired
}

export default Ingredient;
