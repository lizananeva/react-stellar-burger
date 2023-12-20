import { TIngredient } from './types';

type TIdWithCount = {
  id: string,
  count: number
}

export const setStatusClass = (status: string) => status === 'done' ? 'text_color_success' : '';

export const setStatusText = (status: string) => {
  if (status === 'created') return 'Создан';
  if (status === 'done') return 'Выполнен';
  if (status === 'pending') return 'Отменен';
}

const getIngredientsCount = (id: string, ingredients: string[], allIngredients: TIngredient[]) => {
  let count = 0;
  const ingredient = allIngredients.find(element => element._id === id);

  ingredient?.type === 'bun'
    ? count = 2
    : ingredients.forEach(ingredientId => {
        if (ingredientId === id) count++;
      });
  return count;
}

export const getIngredientsWithCount = (ingredients: string[], allIngredients: TIngredient[]) =>
  ingredients.map(ingredient => {
    const count = getIngredientsCount(ingredient, ingredients, allIngredients);
    return { id: ingredient, count: count }
  });

export const getUniqueIngredients = (ingredients: string[]) =>
  ingredients.filter((id, index, array) => array.indexOf(id) === index);

export const getUniqueIngredientsWithCount = (ingredients: string[], ingredientsWithCount: TIdWithCount[]) =>
  ingredients.map(id => ingredientsWithCount.find(value => value.id === id));

export const getOrderIngredients = (ingredients: (TIdWithCount | undefined)[], allIngredients: TIngredient[]) =>
  ingredients.map(element => {
    const ingredient = allIngredients.find(ingredient => ingredient._id === element?.id);

    return { ...ingredient, count: element?.count }
  });
