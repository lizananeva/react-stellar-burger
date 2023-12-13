import styles from './layout.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIngredients, selectIsIngredientsLoading, selectLoadingError } from '../../services/ingredients-slice';
import AppHeader from '../app-header/app-header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const isLoading = useSelector(selectIsIngredientsLoading);
  const isError = useSelector(selectLoadingError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  if (isError) {
    return <p className={`${styles.message} text text_type_main-medium`}>Извините, произошла ошибка</p>;
  }

  if (isLoading) {
    return <p className={`${styles.message} text text_type_main-medium`}>Подождите, пожалуйста.<br/>Идет загрузка...</p>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} pb-10`}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;
