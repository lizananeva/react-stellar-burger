import styles from './burger-ingredients.module.css';
import { useState, useMemo, useEffect, FC } from 'react';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { selectIngredients } from '../../services/ingredients-slice';
import TabsPanel from '../tabs-panel/tabs-panel';
import CardsGroup from '../cards-group/cards-group';
import { TIngredient } from '../../utils/types';

const BurgerIngredients: FC = () => {
  const [activeTab, setActiveTab] = useState('bun');

  const [bunRef, bunInView] = useInView({threshold: 0});
  const [sauceRef, sauceInView] = useInView({threshold: 0});
  const [mainRef, mainInView] = useInView({threshold: 0});

  const switchActiveTab = (bunInView: boolean, sauceInView: boolean, mainInView: boolean): string => {
    if (bunInView) return 'bun';
    if (sauceInView) return 'sauce';
    if (mainInView) return 'main';

    return 'bun';
  }

  const onTabClick = (tab: string) => {
    const tabElement = document.getElementById(tab);

    setActiveTab(tab);
    tabElement && tabElement.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    setActiveTab(switchActiveTab(bunInView, sauceInView, mainInView));
  }, [bunInView, sauceInView, mainInView]);

  const ingredients = useSelector(selectIngredients) as TIngredient[];

  const bunCards = useMemo(() => ingredients?.filter(el => el.type === 'bun'), [ingredients]);
  const sauceCards = useMemo(() => ingredients?.filter(el => el.type === 'sauce'), [ingredients]);
  const mainCards = useMemo(() => ingredients?.filter(el => el.type === 'main'), [ingredients]);

  return (
    <section className={`${styles.ingredients}`}>
      <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
      <TabsPanel active={activeTab} onTabClick={onTabClick} />
      <div className={`${styles.container} mt-10`}>
        <CardsGroup title={'Булки'} cards={bunCards} id={'bun'} ref={bunRef} />
        <CardsGroup title={'Соусы'} cards={sauceCards} id={'sauce'} ref={sauceRef} />
        <CardsGroup title={'Начинки'} cards={mainCards} id={'main'} ref={mainRef} />
      </div>
    </section>
  )
}

export default BurgerIngredients;
