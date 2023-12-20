import styles from './login.module.css';
import { FC, FormEvent } from 'react';
import { useAppDispatch } from '../../utils/hooks';
import { useForm } from '../../hooks/use-form';
import { fetchLogin } from '../../utils/api';
import { Link } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../../components/form/form';

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const {values, onChange} = useForm({email: '', password: ''});

  const login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchLogin(values));
  }

  return (
    <Form title='Вход' onSubmit={login}>
      <>
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
        <Button htmlType='submit' type='primary' size='medium'>Войти</Button>
      </>
      <>
        <p className='text text_type_main-default text_color_inactive mb-4'>
          Вы — новый пользователь?
          <Link to='/register' className={`${styles.link} text text_color_accent pl-2`}>Зарегистрироваться</Link>
        </p>
        <p className='text text_type_main-default text_color_inactive'>
          Забыли пароль?
          <Link to='/forgot-password' className={`${styles.link} text text_color_accent pl-2`}>Восстановить пароль</Link>
        </p>
      </>
    </Form>
  )
}

export default Login;
