import styles from './reset-password.module.css';
import { FC, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsEmailChecked } from '../../services/auth-slice';
import { fetchResetPassword } from '../../utils/api';
import { useForm } from '../../hooks/use-form';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../../components/form/form';

const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {values, setValues, onChange} = useForm({password: '', token: ''});

  const resetPassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchResetPassword(values));
    setValues({password: '', token: ''});
    navigate('/');
  };

  const isEmailChecked = useSelector(selectIsEmailChecked);

  if (!isEmailChecked) {
    return <Navigate to='/forgot-password' />;
  }

  return (
    <Form title='Восстановление пароля' onSubmit={resetPassword}>
      <>
        <PasswordInput
          placeholder={'Введите новый пароль'}
          name={'password'}
          value={values.password}
          onChange={onChange}
          extraClass='mb-6'
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          name={'token'}
          value={values.token}
          onChange={onChange}
          extraClass='mb-6'
        />
        <Button htmlType='submit' type='primary' size='medium'>Сохранить</Button>
      </>
      <>
        <p className='text text_type_main-default text_color_inactive mb-4'>
          Вспомнили пароль?
          <Link to='/login' className={`${styles.link} text text_color_accent pl-2`}>Войти</Link>
        </p>
      </>
    </Form>
  )
}

export default ResetPassword;
