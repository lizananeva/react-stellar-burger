import { fakeOrderDetails, fakeError } from '../../utils/fake-data';
import {
  orderReducer,
  initialState,
  hideOrder
} from './order-slice';

describe('Test order details reducer', () => {
  test('Return initial state', () => {
    expect(orderReducer(undefined, { type: undefined }))
    .toEqual(initialState)
  })
  test('Hide order details', () => {
    expect(orderReducer(initialState, hideOrder()))
    .toEqual(initialState)
  })
  test('Posting order process', () => {
    expect(
      orderReducer(initialState, { type: 'order/post/pending' }))
      .toEqual({ ...initialState, isLoading: true })
  })
  test('Post order completed successfully', () => {
    expect(
      orderReducer(initialState, { type: 'order/post/fulfilled', payload: fakeOrderDetails }))
      .toEqual({ ...initialState, order: fakeOrderDetails.order, isModalOpen: true })
  })
  test('Failed to post order', () => {
    expect(
      orderReducer(initialState, { type: 'order/post/rejected', payload: fakeError }))
      .toEqual(initialState)
  })
})
