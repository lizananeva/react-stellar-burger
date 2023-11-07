import styles from './cards-group.module.css';
import { forwardRef } from 'react';
import Card from '../card/card';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';

const CardsGroup = forwardRef(({ title, cards, id }, ref) => {
  return (
    <section id={id} className={`${styles.cards} mb-10`} ref={ref} >
      <h2 className='text text_type_main-medium'>{title}</h2>
      <ul className={`${styles.list} pt-6 pr-1 pl-4`}>
        {cards.map(card => <Card data={card} key={card._id} />)}
      </ul>
    </section>
  )
})

CardsGroup.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(ingredientPropType).isRequired,
  id: PropTypes.string.isRequired
}

export default CardsGroup;
