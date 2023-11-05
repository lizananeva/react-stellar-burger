import styles from './tabs-panel.module.css';
import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const TabsPanel = () => {
  return (
    <ul className={styles.tabs}>
      <li>
        <Tab value='bun' active={true}>Булки</Tab>
      </li>
      <li>
        <Tab value='sauce'>Соусы</Tab>
      </li>
      <li>
        <Tab value='main'>Начинки</Tab>
      </li>
    </ul>
  )
}

export default TabsPanel;
