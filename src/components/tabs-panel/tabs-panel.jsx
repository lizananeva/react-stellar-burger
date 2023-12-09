import styles from './tabs-panel.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const TabsPanel = ({ active, onTabClick }) => {
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

TabsPanel.propTypes = {
  active: PropTypes.string,
  onTabClick: PropTypes.func.isRequired
}

export default TabsPanel;
