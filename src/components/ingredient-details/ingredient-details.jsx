import styles from './ingredient-details.module.css';
import React from 'react';
import PropTypes from 'prop-types';

const IngredientDetails = ({ data }) => {
  const { image_large, name, calories, proteins, fat, carbohydrates } = data;

  return (
    <div className={styles.content}>
      <img className={`${styles.image} mb-4`} src={image_large} alt={name} />
      <h3 className='text text_type_main-medium mb-8'>{name}</h3>
      <ul className={`${styles.details} text text_color_inactive pb-5`}>
        <li>
          <p className='text text_type_main-default mb-2'>Калории,ккал</p>
          <p className='text text_type_digits-default'>{calories}</p>
        </li>
        <li>
          <p className='text text_type_main-default mb-2'>Белки, г</p>
          <p className='text text_type_digits-default'>{proteins}</p>
        </li>
        <li>
          <p className='text text_type_main-default mb-2'>Жиры, г</p>
          <p className='text text_type_digits-default'>{fat}</p>
        </li>
        <li>
          <p className='text text_type_main-default mb-2'>Углеводы, г</p>
          <p className='text text_type_digits-default'>{carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    image_large: PropTypes.string.isRequired,
  }).isRequired
}

export default IngredientDetails;
