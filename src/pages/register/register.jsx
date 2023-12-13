import styles from './register.module.css';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/use-form';
import { fetchRegister } from '../../utils/api';
import { Link } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../../components/form/form';

const Register = () => {
  const dispatch = useDispatch();
  const {values, setValues, onChange} = useForm({name: '', email: '', password: ''});

  const register = event => {
    event.preventDefault();
    dispatch(fetchRegister(values));
    setValues({name: '', email: '', password: ''});
  }

  return (
    <Form title='Регистрация' onSubmit={register}>
      <>
        <Input
          type={'text'}
          placeholder={'Имя'}
          name={'name'}
          value={values.name}
          onChange={onChange}
        />
        <EmailInput
          name={'email'}
          value={values.email}
          onChange={onChange}
          isIcon={false}
        />
        <PasswordInput
          name={'password'}
          value={values.password}
          onChange={onChange}
        />
        <Button htmlType='submit' type='primary' size='medium'>Зарегистрироваться</Button>
      </>
      <>
        <p className='text text_type_main-default text_color_inactive mb-4'>
          Уже зарегистрированы?
          <Link to='/login' className={`${styles.link} text text_color_accent pl-2`}>Войти</Link>
        </p>
      </>
    </Form>
  )
}

export default Register;
