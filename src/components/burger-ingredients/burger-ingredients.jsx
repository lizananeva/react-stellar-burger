import styles from './burger-ingredients.module.css';
import React, { useMemo } from 'react';
import TabsPanel from '../tabs-panel/tabs-panel';
import CardsGroup from '../cards-group/cards-group';
import PropTypes from 'prop-types';

const BurgerIngredients = ({ data, openDetails }) => {
  const bunCards = useMemo(() => data.filter(el => el.type === 'bun'), [data]);
  const sauceCards = useMemo(() => data.filter(el => el.type === 'sauce'), [data]);
  const mainCards = useMemo(() => data.filter(el => el.type === 'main'), [data]);

  return (
    <section className={`${styles.ingredients}`}>
      <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
      <TabsPanel />
      <div className={`${styles.container} mt-10`}>
        <CardsGroup title={'Булки'} cards={bunCards} openDetails={openDetails} />
        <CardsGroup title={'Соусы'} cards={sauceCards} openDetails={openDetails} />
        <CardsGroup title={'Начинки'} cards={mainCards} openDetails={openDetails} />
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  })).isRequired,
  openDetails: PropTypes.func.isRequired
}

export default BurgerIngredients;
