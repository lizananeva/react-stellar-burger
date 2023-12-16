import styles from './profile.module.css';
import { FC, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLogout } from '../../utils/api';
import { useLocation, NavLink, Outlet } from 'react-router-dom';

const Profile: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const logout = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    dispatch(fetchLogout());
  }
  const setActiveLink = ({ isActive }: { isActive: boolean }): string =>
    `${styles.link} ${isActive ? styles.active : styles.inactive} pt-4 pr-4 pb-4`;

  return (
  <div className={styles.container}>
    <aside className={`${styles.column} mr-15`}>
      <nav className={`${styles.navigation} mb-20`}>
        <NavLink className={setActiveLink} to='/profile' end>
          <span className={`${styles.span} text text_type_main-medium`}>Профиль</span>
        </NavLink>
        <NavLink className={setActiveLink} to='/profile/orders' end>
          <span className={`${styles.span} text text_type_main-medium`}>История заказов</span>
        </NavLink>
        <NavLink className={setActiveLink} to='/' onClick={logout} end>
          <span className={`${styles.span} text text_type_main-medium`}>Выход</span>
        </NavLink>
      </nav>
      <p className={`${styles.hint} text text_type_main-default`}>
        {location.pathname.includes('/orders')
          ? 'В этом разделе вы можете просмотреть свою историю заказов'
          : 'В этом разделе вы можете\nизменить свои персональные данные'}
      </p>
    </aside>
    <Outlet />
  </div>
  )
}

export default Profile;
