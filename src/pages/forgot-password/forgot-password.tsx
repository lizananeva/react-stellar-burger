import styles from './forgot-password.module.css';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { setEmailChecked } from '../../services/auth-slice';
import { fetchForgotPassword } from '../../utils/api';
import { useForm } from '../../hooks/use-form';
import { useNavigate, Link } from 'react-router-dom';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../../components/form/form';

const ForgotPassword: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {values, setValues, onChange} = useForm({email: ''});

  const forgotPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(fetchForgotPassword(values)) // @ts-ignore
      .then(response => dispatch(setEmailChecked(response.payload.success)));
    setValues({email: ''});
    navigate('/reset-password');
  }

  return (
    <Form title='Восстановление пароля' onSubmit={forgotPassword}>
      <>
        <EmailInput
          placeholder={'Укажите e-mail'}
          name={'email'}
          value={values.email}
          onChange={onChange}
          isIcon={false}
          extraClass='mb-6'
        />
        <Button htmlType='submit' type='primary' size='medium'>Восстановить</Button>
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

export default ForgotPassword;
