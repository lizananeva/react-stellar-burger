import { setUser, setAuthChecked } from '../services/auth-slice';
import { createAsyncThunk } from '@reduxjs/toolkit';

const config = {
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
}

export const checkResponse = response => {
  if ( response.ok) {
    return response.json();
  }
  return response.json().then(response => Promise.reject(`Ошибка ${response.status}`));
}

const request = (endpoint, options) =>
  fetch(`${config.baseUrl}${endpoint}`, options).then(checkResponse);

export const getIngredientsData = async () => await request('/ingredients');

export const postOrder = ingredients =>
  request('/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ingredients)
  });

export const refreshToken = () =>
  request('/auth/token', {
    method: 'POST',
    headers: config.headers,
      body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
  });

const fetchWithRefresh = async (url, options) => {
  try {
    const response = await fetch(url, options);
    return await checkResponse(response);
  } catch (error) {
    if (error.message === 'jwt expired') {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem('accessToken', refreshData.accessToken);
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      options.headers.authorization = refreshData.accessToken;
      const response = await fetch(url, options);
      return await checkResponse(response);
    } else {
      return Promise.reject(error);
    }
  }
}

export const getUser = () =>
  dispatch =>
    fetchWithRefresh(`${config.baseUrl}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken')
      }
    }).then(response => {
      if (response.success) {
        dispatch(setUser(response.user));
      } else {
        return Promise.reject('Ошибка данных с сервера');
      }
    });

export const checkUserAuth = () =>
  dispatch => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUser())
        .catch(error => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  }

export const login = async ({email, password}) => {
  const response = await request('/auth/login', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      email: email,
      password: password
    })
  });
  localStorage.setItem('accessToken', response.accessToken);
  localStorage.setItem('refreshToken', response.refreshToken);
  return response.user;
}

export const logout = () => {
  request('/auth/logout', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
  });
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export const register = async ({name, email, password}) => {
  const response = await request('/auth/register', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      email: email,
      password: password
    })
  });
  localStorage.setItem('accessToken', response.accessToken);
  localStorage.setItem('refreshToken', response.refreshToken);
  return response.user;
}

export const updateUser = async ({name, email, password}) => {
  const response = await request('/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password
    })
  })
  return response.user;
}

export const forgotPassword = ({email}) =>
  request('/password-reset', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ email: email })
  });

export const resetPassword = ({password, token}) =>
  request('/password-reset/reset', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      password: password,
      token: token
    })
  });


export const fetchLogin = createAsyncThunk(
  'auth/login',
  login
);

export const fetchLogout = createAsyncThunk(
  'auth/logout',
  logout
);

export const fetchRegister = createAsyncThunk(
  'auth/register',
  register
);

export const fetchUpdateUser = createAsyncThunk(
  'auth/updateUser',
  updateUser
);

export const fetchForgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  forgotPassword
);

export const fetchResetPassword = createAsyncThunk(
  'auth/resetPassword',
  resetPassword
);
