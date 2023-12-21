import { fakeApiIngredients, fakeError } from '../../utils/fake-data';
import { ingredientsReducer, initialState } from './ingredients-slice';

describe('Test ingredients reducer', () => {
  test('Return initial state', () => {
    expect(ingredientsReducer(undefined, { type: undefined }))
    .toEqual(initialState)
  })
  test('Loading ingredients data process', () => {
    expect(
      ingredientsReducer(initialState, { type: 'ingredients/fetch/pending' }))
      .toEqual({ ...initialState, isLoading: true })
  })
  test('Successful ingredients data fetch', () => {
    expect(
      ingredientsReducer(initialState, { type: 'ingredients/fetch/fulfilled', payload: fakeApiIngredients }))
      .toEqual({ ...initialState, ingredients: fakeApiIngredients.data, isLoading: false })
  })
  test('Failed to fetch ingredients data', () => {
    expect(
      ingredientsReducer(initialState, { type: 'ingredients/fetch/rejected', error: fakeError }))
      .toEqual({ ...initialState, error: fakeError })
  })
})
