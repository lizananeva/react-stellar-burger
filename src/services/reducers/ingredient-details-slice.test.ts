import { fakeIngredient } from '../../utils/fake-data';
import {
  ingredientDetailsReducer,
  initialState,
  showDetails,
  hideDetails
} from './ingredient-details-slice';

describe('Test ingredient details reducer', () => {
  test('Return initial state', () => {
    expect(ingredientDetailsReducer(undefined, { type: undefined }))
    .toEqual(initialState)
  })
  test('Show ingredient details', () => {
    expect(ingredientDetailsReducer(initialState, showDetails(fakeIngredient)))
    .toEqual({ ingredient: fakeIngredient, isModalOpen: true })
  })
  test('Hide ingredient details', () => {
    expect(ingredientDetailsReducer(initialState, hideDetails()))
    .toEqual(initialState)
  })
})
