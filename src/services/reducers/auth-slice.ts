import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLogin, fetchLogout, fetchRegister, fetchUpdateUser, fetchForgotPassword, fetchResetPassword } from '../../utils/api';
import { RootStore } from '../store';
import { TUser } from '../../utils/types';

type TState = {
  user: { name: string; email: string } | null,
  isAuthChecked: boolean,
  isEmailChecked: boolean,
  error: string | unknown
}

export const initialState: TState = {
  user: null,
  isAuthChecked: false,
  isEmailChecked: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setEmailChecked: (state, action: PayloadAction<boolean>) => {
      state.isEmailChecked = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchLogout.fulfilled, state => {
        state.user = null;
        state.error = null;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchForgotPassword.fulfilled, state => {
        state.error = null;
      })
      .addCase(fetchForgotPassword.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchResetPassword.fulfilled, state => {
        state.error = null;
      })
      .addCase(fetchResetPassword.rejected, (state, action) => {
        state.error = action.payload;
      })
  }
});

export const { setUser, setAuthChecked, setEmailChecked } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectUser = (state: RootStore) => state.auth.user;
export const selectIsAuthChecked = (state: RootStore) => state.auth.isAuthChecked;
export const selectIsEmailChecked = (state: RootStore) => state.auth.isEmailChecked;
