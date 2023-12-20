import styles from './app-header.module.css';
import { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader: FC = () => {
  const setActiveLink = ({ isActive }: { isActive: boolean }): string =>
    `${styles.link} ${isActive ? styles.active : styles.inactive} pt-4 pr-5 pb-4 pl-5`;

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={styles.navigation}>
        <NavLink to='/' className={setActiveLink}>
          <BurgerIcon type='primary' />
          <p className='text text_type_main-default ml-2'>Конструктор</p>
        </NavLink>
        <NavLink to='/feed' className={setActiveLink}>
          <ListIcon type='secondary' />
          <p className='text text_type_main-default ml-2'>Лента заказов</p>
        </NavLink>
      </nav>
      <Link to='/' className={styles.logo}>
        <Logo />
      </Link>
      <nav className={styles.profile}>
        <NavLink to='/profile' className={setActiveLink}>
          <ProfileIcon type='secondary' />
          <p className='text text_type_main-default ml-2'>Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  )
}

export default AppHeader;
