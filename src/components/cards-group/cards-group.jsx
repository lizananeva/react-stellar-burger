import styles from './cards-group.module.css';
import React from 'react';
import Card from '../card/card';
import PropTypes from 'prop-types';

const CardsGroup = ({ title, cards, openDetails }) => {
  return (
    <section className={`${styles.cards} mb-10`}>
      <h2 className='text text_type_main-medium'>{title}</h2>
      <ul className={`${styles.list} pt-6 pr-1 pl-4`}>
        {cards.map((card, index) => <Card data={card} key={index} openDetails={openDetails}/>)}
      </ul>
    </section>
  )
}

CardsGroup.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  })).isRequired,
  openDetails: PropTypes.func.isRequired
}

export default CardsGroup;
