import styles from './app-header.module.css';
import React from 'react';
import NavigationLink from '../navigation-link/navigation-link';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={styles.navigation}>
        <NavigationLink>
          <BurgerIcon type='primary' />
          <p className='text text_type_main-default ml-2'>Конструктор</p>
        </NavigationLink>
        <NavigationLink>
          <ListIcon type='secondary' />
          <p className='text text_type_main-default ml-2'>Лента заказов</p>
        </NavigationLink>
      </nav>
      <a className={styles.logo}>
        <Logo />
      </a>
      <nav className={styles.profile}>
        <NavigationLink>
          <ProfileIcon type='secondary' />
          <p className='text text_type_main-default ml-2'>Личный кабинет</p>
        </NavigationLink>
      </nav>
    </header>
  )
}

export default AppHeader;
