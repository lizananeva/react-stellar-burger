import styles from './form.module.css';
import { FC, FormEvent, ReactNode } from 'react';

type TFormProps = {
  title: string,
  onSubmit: (event: FormEvent<HTMLFormElement>) => void,
  children: ReactNode[]
}

const Form: FC<TFormProps> = ({ title, onSubmit, children}) => {
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

export default Form;
