import styles from './card.module.css';
import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const Card = ({ data, openDetails }) => {
  const { image, name, price } = data;

  return (
    <li>
      <article className={styles.card} onClick={() => openDetails(data)}>
        {/* <Counter count={1} size='default'/> */}
        <img src={image} alt={name} className={`${styles.image} pr-4 pl-4 mb-2`} />
        <div className={`${styles.price} mb-2`}>
          <p className='text text_type_digits-default mr-2'>{price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <h3 className={`${styles.name} text text_type_main-default`}>{name}</h3>
      </article>
    </li>
  )
}

Card.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  openDetails: PropTypes.func.isRequired
}

export default Card;
