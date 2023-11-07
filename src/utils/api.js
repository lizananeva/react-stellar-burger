const config = {
  BASE_URL: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json'
  }
}

export const checkResponse = response => {
  if ( response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка ${response.status}`);
}

export const getIngredientsData = () => {
  return fetch(`${config.BASE_URL}/ingredients`)
    .then(response => checkResponse(response))
    .catch(console.error)
}

export const postOrder = async (ingredients, thunkAPI) => {
  return fetch(`${config.BASE_URL}/orders`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(ingredients)
  })
  .then(response => checkResponse(response))
  .catch(console.error)
}
