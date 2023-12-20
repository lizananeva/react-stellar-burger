export type TIngredient = {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number
}

export type TIngredientWithId = TIngredient & { _constId: string }

export type TValues = {
  [name: string]: string;
}

export type TOrder = {
  _id: string,
  ingredients: string[],
  status: string,
  name: string,
  createdAt: string,
  updatedAt: string,
  number: number
}

export type TOrders = {
  success: boolean,
  orders: TOrder[],
  total: number,
  totalToday: number
}

export type TUser = { name: string, email: string } | null;
