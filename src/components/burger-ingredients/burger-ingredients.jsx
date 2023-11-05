import styles from './burger-ingredients.module.css';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import TabsPanel from '../tabs-panel/tabs-panel';
import CardsGroup from '../cards-group/cards-group';
import { ingredientPropType } from '../../utils/prop-types';

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
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
  openDetails: PropTypes.func.isRequired
}

export default BurgerIngredients;
