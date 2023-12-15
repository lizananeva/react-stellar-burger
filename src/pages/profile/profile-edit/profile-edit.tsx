import styles from './profile-edit.module.css';
import { FC, MouseEventHandler, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../../hooks/use-form';
import { fetchUpdateUser } from '../../../utils/api';
import { selectUser } from '../../../services/auth-slice';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

type TUser = {
  name: string,
  email: string,
  password: string
}

const ProfileEditForm: FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDisabled, setDisabled] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);

  const user = useSelector(selectUser);
  const { name, email } = user;
  const { values, setValues, onChange: onChangeDefault } = useForm({
    name: name || '',
    email: email || '',
    password: ''
  });

  const dispatch = useDispatch();

  const setDefaultInputs = (user: TUser) => {
    if (name && email) {
      setValues({
        name: name,
        email: email,
        password: ''
      });
    }
  }

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(fetchUpdateUser(values));
    localStorage.removeItem('userData');
    setIsEdit(false);
  }

  const onReset = () => {
    setDefaultInputs(user);
    setIsEdit(false);
  }

  const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    onChangeDefault(event);
    setIsEdit(true);
  }

  const onIconClick: MouseEventHandler = event => {
    setTimeout(() => inputRef.current?.focus(), 0);
    setDisabled(false);
  }

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setDisabled(true);
  }

  useEffect(() => {
    setDefaultInputs(user);
  }, [name, email]);

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Input
        ref={inputRef}
        placeholder={'Имя'}
        name={'name'}
        value={values.name}
        onChange={onChange}
        onIconClick={onIconClick}
        onBlur={onBlur}
        disabled={isDisabled}
        error={false}
        icon={'EditIcon'}
      />
      <EmailInput
        name={'email'}
        value={values.email}
        onChange={onChange} // @ts-ignore
        error={false}
        isIcon={true}
      />
      <PasswordInput
        name={'password'}
        value={values.password}
        onChange={onChange} // @ts-ignore
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
