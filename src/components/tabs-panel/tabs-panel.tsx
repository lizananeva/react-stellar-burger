import styles from './tabs-panel.module.css';
import { FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

type TTabsPanelProps = {
  active: string,
  onTabClick: (tab: string) => void
}

const TabsPanel: FC<TTabsPanelProps> = ({ active, onTabClick }) => {
  return (
    <ul className={styles.tabs}>
      <li>
        <Tab value='bun' active={active === 'bun'} onClick={() => onTabClick('bun')}>Булки</Tab>
      </li>
      <li>
        <Tab value='sauce' active={active === 'sauce'} onClick={() => onTabClick('sauce')}>Соусы</Tab>
      </li>
      <li>
        <Tab value='main' active={active === 'main'} onClick={() => onTabClick('main')}>Начинки</Tab>
      </li>
    </ul>
  )
}

export default TabsPanel;
