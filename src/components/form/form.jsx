import styles from './form.module.css';
import PropTypes from 'prop-types';

const Form = ({ title, onSubmit, children}) => {
  return (
  <div className={styles.container}>
    <h1 className='text text_type_main-medium mb-6'>{title}</h1>
    <form className={`${styles.form} mb-20`} onSubmit={onSubmit}>
      {children[0]}
    </form>
    <div className={styles.hint}>
      {children[1]}
    </div>
  </div>
  )
}

Form.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default Form;
