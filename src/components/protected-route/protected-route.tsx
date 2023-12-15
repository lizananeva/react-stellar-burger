import { FC, ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { setAuthChecked, selectIsAuthChecked, selectUser } from '../../services/auth-slice';
import { checkUserAuth } from '../../utils/api';

type TProtectedProps = {
  onlyUnAuth: boolean,
  component: ReactElement
}

const Protected: FC<TProtectedProps> = ({ onlyUnAuth = false, component }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthChecked(false));
    dispatch(checkUserAuth());
  }, [dispatch]);

  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);
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