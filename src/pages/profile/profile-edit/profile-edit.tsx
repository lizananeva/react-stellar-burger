import styles from './profile-edit.module.css';
import { useState, useRef, useEffect, FC, FormEvent, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { useForm } from '../../../hooks/use-form';
import { fetchUpdateUser } from '../../../utils/api';
import { selectUser } from '../../../services/reducers/auth-slice';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

type TUser = {
  name: string,
  email: string
}

const ProfileEditForm: FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDisabled, setDisabled] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);

  const user = useAppSelector(selectUser);
  const { values, setValues, onChange: onChangeDefault } = useForm({ name: '', email: '', password: '' });

  const dispatch = useAppDispatch();

  const setDefaultInputs = (user: TUser) => {
    if (user && user.name && user.email) setValues({ name: user.name, email: user.email, password: '' });
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchUpdateUser(values));
    localStorage.removeItem('userData');
    setIsEdit(false);
  }

  const onReset = () => {
    if (user) setDefaultInputs(user);
    setIsEdit(false);
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeDefault(event);
    setIsEdit(true);
  }

  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0);
    setDisabled(false);
  }

  const onBlur = () => {
    setDisabled(true);
  }

  useEffect(() => {
    if (user) setDefaultInputs(user);
  }, [user?.name, user?.email]);

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
