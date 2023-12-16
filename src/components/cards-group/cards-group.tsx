import styles from './cards-group.module.css';
import { forwardRef } from 'react';
import Card from '../card/card';
import { TIngredient } from '../../utils/types';

type TCardsGroupProps = {
  title: string,
  cards: TIngredient[],
  id: string
}

const CardsGroup = forwardRef<HTMLElement, TCardsGroupProps>(({ title, cards, id }, ref) => {
  return (
    <section id={id} className={`${styles.cards} mb-10`} ref={ref} >
      <h2 className='text text_type_main-medium'>{title}</h2>
      <ul className={`${styles.list} pt-6 pr-1 pl-4`}>
        {cards.map((card: TIngredient) => <Card ingredient={card} key={card._id} />)}
      </ul>
    </section>
  )
})

export default CardsGroup;
