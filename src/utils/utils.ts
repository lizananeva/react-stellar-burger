import { TIngredient } from './types';

export const setStatusClass = (status: string) => status === 'done' ? 'text_color_success' : '';

export const setStatusText = (status: string) => {
  if (status === 'created') return 'Создан';
  if (status === 'done') return 'Выполнен';
  if (status === 'pending') return 'Отменен';
}

export const getOrderIngredients = (ingredients: string[], globalIngredients: TIngredient[]) =>
  ingredients.map(ingredient =>
    globalIngredients.find(element => element._id === ingredient)
  );

export const getTotalPrice = (ingredients: (TIngredient | undefined)[]) =>
  ingredients.reduce((sum: number, ingredient: TIngredient | undefined) =>
    !ingredient?.type
      ? sum += 0
      : ingredient.type === 'bun'
        ? sum += ingredient.price * 2
        : sum += ingredient.price,
    0
)
