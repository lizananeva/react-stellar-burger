import { TIngredient, TIngredientWithId, TOrders, TUser } from './types';

export const fakeUser: TUser = {
  name: 'Agent Smith',
  email: 'test-matrix@mail.com'
}

export const fakeError = {
  message: "Do not try and bend the spoon, that's impossible"
}

export const fakeIngredient: TIngredient = {
  '_id': '60666c42cc7b410027a1a9bf',
  'name': 'Сыр с астероидной плесенью',
  'type': 'main',
  'proteins': 84,
  'fat': 48,
  'carbohydrates': 420,
  'calories': 3377,
  'price': 4142,
  'image': 'https://code.s3.yandex.net/react/code/cheese.png',
  'image_mobile': 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
  'image_large': 'https://code.s3.yandex.net/react/code/cheese-large.png',
  '__v':0
}
export const fakeIngredientWithId: TIngredientWithId = { ...fakeIngredient, _constId: '123' }

export const fakeBun: TIngredient = {
  '_id': '60666c42cc7b410027a1a9b1',
  'name': 'Краторная булка N-200i',
  'type': 'bun',
  'proteins': 80,
  'fat': 24,
  'carbohydrates': 53,
  'calories': 420,
  'price': 1255,
  'image': 'https://code.s3.yandex.net/react/code/bun-02.png',
  'image_mobile': 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  'image_large': 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  '__v': 0
}

export const fakeBunWithId: TIngredientWithId = { ...fakeBun, _constId: '456' }

export const fakeApiIngredients = {
  data: [
    {
      '_id': '60666c42cc7b410027a1a9b1',
      'name': 'Краторная булка N-200i',
      'type': 'bun',
      'proteins': 80,
      'fat': 24,
      'carbohydrates': 53,
      'calories': 420,
      'price': 1255,
      'image': 'https://code.s3.yandex.net/react/code/bun-02.png',
      'image_mobile': 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      'image_large': 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      '__v': 0
    },
    {
      '_id': '60666c42cc7b410027a1a9be',
      'name': 'Мини-салат Экзо-Плантаго',
      'type': 'main',
      'proteins': 1,
      'fat': 2,
      'carbohydrates': 3,
      'calories': 6,
      'price': 4400,
      'image': 'https://code.s3.yandex.net/react/code/salad.png',
      'image_mobile': 'https://code.s3.yandex.net/react/code/salad-mobile.png',
      'image_large': 'https://code.s3.yandex.net/react/code/salad-large.png',
      '__v': 0
    },
    {
      '_id': '60666c42cc7b410027a1a9b3',
      'name': 'Филе Люминесцентного тетраодонтимформа',
      'type': 'main',
      'proteins': 44,
      'fat': 26,
      'carbohydrates': 85,
      'calories': 643,
      'price': 988,
      'image': 'https://code.s3.yandex.net/react/code/meat-03.png',
      'image_mobile': 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      'image_large': 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      '__v': 0
    }
  ]
}

export const fakeConstructor = {
  bun: {
    '_id': '60666c42cc7b410027a1a9b2',
    'name': 'Флюоресцентная булка R2-D3',
    'type': 'bun',
    'proteins': 44,
    'fat': 26,
    'carbohydrates': 85,
    'calories': 643,
    'price': 988,
    'image': 'https://code.s3.yandex.net/react/code/bun-01.png',
    'image_mobile': 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    'image_large': 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    '__v': 0,
    '_constId': '567'
  },
  ingredients:[
    {
      '_id': '60666c42cc7b410027a1a9bb',
      'name': 'Хрустящие минеральные кольца',
      'type': 'main',
      'proteins': 808,
      'fat': 689,
      'carbohydrates': 609,
      'calories': 986,
      'price': 300,
      'image': 'https://code.s3.yandex.net/react/code/mineral_rings.png',
      'image_mobile': 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
      'image_large': 'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
      '__v': 0,
      '_constId': '234'
    },
    {
      '_id': '60666c42cc7b410027a1a9b6',
      'name': 'Биокотлета из марсианской Магнолии',
      'type': 'main',
      'proteins': 420,
      'fat': 142,
      'carbohydrates': 242,
      'calories': 4242,
      'price': 424,
      'image': 'https://code.s3.yandex.net/react/code/meat-01.png',
      'image_mobile': 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      'image_large': 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      '__v': 0,
      '_constId': '345'
    }
  ]
}

export const fakeOrderDetails = {
  order: {
    ingredients: ['60666c42cc7b410027a1a9b1', '60666c42cc7b410027a1a9bf', '60666c42cc7b410027a1a9be'],
    number: 34536
  }
}

export const fakeWsData: TOrders = {
  success: true,
  orders: [
    {
      _id: 'order id',
      status: 'done',
      number: 1,
      createdAt: '2023-12-31T23:59:59',
      updatedAt: '2024-01-01T00:00:00',
      name: 'order name',
      ingredients: ['60666c42cc7b410027a1a9bb'],
    },
  ],
  total: 1,
  totalToday: 2
}
