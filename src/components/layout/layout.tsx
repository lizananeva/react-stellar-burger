import styles from './layout.module.css';
import { useEffect, FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../utils/hooks';
import { fetchIngredients, selectIsIngredientsLoading, selectLoadingError } from '../../services/reducers/ingredients-slice';
import AppHeader from '../app-header/app-header';
import { Outlet } from 'react-router-dom';

const Layout: FC = () => {
  const isLoading = useAppSelector(selectIsIngredientsLoading);
  const isError = useAppSelector(selectLoadingError);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  if (isError) {
    return <p className={`${styles.message} text text_type_main-medium pt-25`}>Извините, произошла ошибка</p>;
  }

  if (isLoading) {
    return <p className={`${styles.message} text text_type_main-medium pt-25`}>Подождите, пожалуйста.<br/>Идет загрузка...</p>;
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
