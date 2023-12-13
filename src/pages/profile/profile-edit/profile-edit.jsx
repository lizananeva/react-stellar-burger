import styles from './profile-edit.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdateUser } from '../../../utils/api';
import { selectUser } from '../../../services/auth-slice';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const ProfileEditForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const setDefaultsInputs = (user) => {
    if (user.name && user.email) {
      setValues({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  }

  useEffect(() => {
    setDefaultsInputs(user);
  }, [user.name, user.email]);

  const [values, setValues] = useState({
    name: user.name || '',
    email: user.email || '',
    password: ''
  });
  const [isEdit, setIsEdit] = useState(false);

  const onSubmit = event => {
    event.preventDefault();
    dispatch(fetchUpdateUser(values));
    localStorage.removeItem('userData');
    setIsEdit(false);
  }

  const onReset = () => {
    setDefaultsInputs(user);
    setIsEdit(false);
  }

  const onChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
    setIsEdit(true);
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Input
        placeholder={'Имя'}
        name={'name'}
        value={values.name}
        onChange={onChange}
        error={false}
        icon={'EditIcon'}
      />
      <EmailInput
        placeholder='Логин'
        name={'email'}
        value={values.email}
        onChange={onChange}
        error={false}
        isIcon={true}
      />
      <PasswordInput
        name={'password'}
        value={values.password}
        onChange={onChange}
        error={false}
        icon={'EditIcon'}
      />
      {isEdit && (
        <div className={styles.buttons}>
          <Button htmlType='reset' type='secondary' size='medium' onClick={onReset}>Отмена</Button>
          <Button htmlType='submit' type='primary' size='medium'>Сохранить</Button>
        </div>
      )}
    </form>
  )
}

export default ProfileEditForm;
