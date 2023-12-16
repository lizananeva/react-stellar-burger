import styles from './not-found.module.css';
import { FC } from 'react';

const NotFound: FC = () => {
  return (
    <div className={styles.message}>
    <p className='text text_type_digits-large'>404</p>
    <p className='text text_type_main-large text_color_inactive'>Извините, но такой страницы не существует</p>
    </div>
  )
}

export default NotFound;
