import { fakeIngredientWithId, fakeBunWithId, fakeConstructor } from '../../utils/fake-data';
import {
  constructorReducer,
  initialState,
  addIngredient,
  removeIngredient,
  moveIngredient,
  eraseIngredients
} from './constructor-slice';

describe('Test constructor reducer', () => {
  test('Return initial state', () => {
    expect(constructorReducer(undefined, { type: undefined }))
    .toEqual(initialState)
  })
  test('Add ingredient with type bun', () => {
    expect(constructorReducer(initialState, addIngredient(fakeBunWithId)))
    .toEqual({ ...initialState, bun: fakeBunWithId })
  })
  test('Add ingredient with not-bun type', () => {
    expect(constructorReducer(initialState, addIngredient(fakeIngredientWithId)))
    .toEqual({
      ...initialState,
      ingredients: [...initialState.ingredients, fakeIngredientWithId]
    })
  })
  test('Remove ingredient from constructor', () => {
    expect(constructorReducer(fakeConstructor, removeIngredient(fakeConstructor.ingredients[0])))
    .toEqual({
      bun: fakeConstructor.bun,
      ingredients: [fakeConstructor.ingredients[1]]
    })
  })
  test('Move ingredient to another position', () => {
    expect(constructorReducer(fakeConstructor, moveIngredient(
      { indexFrom: 0, indexTo: 1, ingredient: fakeConstructor.ingredients[0] }
    )))
    .toEqual({
      bun: fakeConstructor.bun,
      ingredients: [
        fakeConstructor.ingredients[1],
        fakeConstructor.ingredients[0],
      ]
    })
  })
  test('Erase all ingredients', () => {
    expect(constructorReducer(fakeConstructor, eraseIngredients()))
    .toEqual(initialState)
  })
})
