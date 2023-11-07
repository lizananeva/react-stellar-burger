import styles from './preloader.module.css';

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <h2 className='text text_type_main-medium'>Идет загрузка...</h2>
    </div>
  )
}
export default Preloader;
