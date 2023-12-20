import { useEffect, FC, ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { Navigate, useLocation } from 'react-router-dom';
import { setAuthChecked, selectIsAuthChecked, selectUser } from '../../services/reducers/auth-slice';
import { checkUserAuth } from '../../utils/api';

type TProtectedProps = {
  onlyUnAuth: boolean,
  component: ReactElement
}

const Protected: FC<TProtectedProps> = ({ onlyUnAuth = false, component }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAuthChecked(false));
    dispatch(checkUserAuth());
  }, [dispatch]);

  const isAuthChecked = useAppSelector(selectIsAuthChecked);
  const user = useAppSelector(selectUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth: FC<{component: ReactElement}> = props => <Protected onlyUnAuth={false} {...props} />;
export const OnlyUnAuth: FC<{component: ReactElement}> = props => <Protected onlyUnAuth={true} {...props} />;
