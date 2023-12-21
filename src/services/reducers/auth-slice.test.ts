import { fakeUser, fakeError } from '../../utils/fake-data';
import {
  authReducer,
  initialState,
  setUser,
  setAuthChecked,
  setEmailChecked
} from './auth-slice';

describe('Test authorization reducer', () => {
  test('Return initial state', () => {
    expect(authReducer(undefined, { type: undefined }))
    .toEqual(initialState)
  })
  test('Set user data', () => {
    expect(authReducer(initialState, setUser(fakeUser)))
    .toEqual({ ...initialState, user: fakeUser })
  })
  test('Set auth checked', () => {
    expect(authReducer(initialState, setAuthChecked(true)))
    .toEqual({ ...initialState, isAuthChecked: true })
  })
  test('Set email checked', () => {
    expect(authReducer(initialState, setEmailChecked(true)))
    .toEqual({ ...initialState, isEmailChecked: true })
  })
  test('Successful user registration', () => {
    expect(
      authReducer(initialState, { type: 'auth/register/fulfilled', payload: fakeUser }))
      .toEqual({ ...initialState, user: fakeUser, isAuthChecked: true })
  })
  test('Failed to register', () => {
    expect(
      authReducer(initialState, { type: 'auth/register/rejected', payload: fakeError }))
      .toEqual({ ...initialState, error: fakeError, isAuthChecked: true })
  })
  test('Successful user login', () => {
    expect(
      authReducer(initialState, { type: 'auth/login/fulfilled', payload: fakeUser }))
      .toEqual({ ...initialState, user: fakeUser, isAuthChecked: true })
  })
  test('Failed to login', () => {
    expect(
      authReducer(initialState, { type: 'auth/login/rejected', payload: fakeError }))
      .toEqual({ ...initialState, error: fakeError })
  })
  test('Successful user logout', () => {
    expect(
      authReducer(initialState, { type: 'auth/logout/fulfilled' }))
      .toEqual(initialState)
  })
  test('Failed to logout', () => {
    expect(
      authReducer(initialState, { type: 'auth/logout/rejected', payload: fakeError }))
      .toEqual({ ...initialState, error: fakeError })
  })
  test('Successful user data update', () => {
    expect(
      authReducer(initialState, { type: 'auth/updateUser/fulfilled', payload: fakeUser }))
      .toEqual({ ...initialState, user: fakeUser, isAuthChecked: true })
  })
  test('Failed to update user data', () => {
    expect(
      authReducer(initialState, { type: 'auth/updateUser/rejected', payload: fakeError }))
      .toEqual({ ...initialState, error: fakeError })
  })
  test('Successful forgot user password', () => {
    expect(
      authReducer(initialState, { type: 'auth/forgotPassword/fulfilled' }))
      .toEqual(initialState)
  })
  test('Failed to forgot user password', () => {
    expect(
      authReducer(initialState, { type: 'auth/forgotPassword/rejected', payload: fakeError }))
      .toEqual({ ...initialState, error: fakeError })
  })
  test('Successful user password reset', () => {
    expect(
      authReducer(initialState, { type: 'auth/resetPassword/fulfilled' }))
      .toEqual(initialState)
  })
  test('Failed to reset user password', () => {
    expect(
      authReducer(initialState, { type: 'auth/resetPassword/rejected', payload: fakeError }))
      .toEqual({ ...initialState, error: fakeError })
  })
})

