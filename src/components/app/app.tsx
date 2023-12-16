import { useEffect, FC } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkUserAuth } from '../../utils/api';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import Layout from '../layout/layout';
import Home from '../../pages/home/home';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Orders from '../../pages/orders/orders';
import Profile from '../../pages/profile/profile';
import ProfileEditForm from '../../pages/profile/profile-edit/profile-edit';
import ProfileHistory from '../../pages/profile/profile-history/profile-history';
import IngredientPage from '../../pages/ingredient/ingredient-page';
import NotFound from '../../pages/not-found/not-found';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

const App: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const background = location.state && location.state.background;

  const onClose = () => {
    navigate(-1);
  }

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  return (
    <>
    <Routes location={background || location}>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='login' element={<OnlyUnAuth component={<Login />} />} />
        <Route path='register' element={<OnlyUnAuth component={<Register />} />} />
        <Route path='forgot-password' element={<OnlyUnAuth component={<ForgotPassword />} />} />
        <Route path='reset-password' element={<OnlyUnAuth component={<ResetPassword />} />} />
        <Route path='orders' element={<Orders />} />
        <Route path='profile' element={<OnlyAuth component={<Profile />} />} >
          <Route index element={<ProfileEditForm />} />
          <Route path='orders' element={<ProfileHistory />} />
        </Route>
        <Route path='ingredients/:id' element={<IngredientPage />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
    {background && (
      <Routes>
        <Route path='ingredients/:id' element = {
          <Modal title='Детали ингредиента' onCloseModal={onClose}>
            <IngredientDetails />
          </Modal>
        }/>
      </Routes>
    )}
    </>
  );
}

export default App;
