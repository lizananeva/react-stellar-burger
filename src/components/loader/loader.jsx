import styles from './loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <h2 className='text text_type_main-medium'>Подождите, пожалуйста.<br/>Идет загрузка...</h2>
    </div>
  )
}
export default Loader;
