import styles from './cards-group.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card';
import { ingredientPropType } from '../../utils/prop-types';

const CardsGroup = ({ title, cards, openDetails }) => {
  return (
    <section className={`${styles.cards} mb-10`}>
      <h2 className='text text_type_main-medium'>{title}</h2>
      <ul className={`${styles.list} pt-6 pr-1 pl-4`}>
        {cards.map(card => <Card data={card} key={card._id} openDetails={openDetails}/>)}
      </ul>
    </section>
  )
}

CardsGroup.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(ingredientPropType).isRequired,
  openDetails: PropTypes.func.isRequired
}

export default CardsGroup;
