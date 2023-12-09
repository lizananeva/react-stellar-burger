const config = {
  baseUrl: 'https://norma.nomoreparties.space/api',
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

const request = (endpoint, options) =>
  fetch(`${config.baseUrl}${endpoint}`, options).then(checkResponse);

export const getIngredientsData = () => request('/ingredients');

export const postOrder = ingredients =>
  request('/orders', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(ingredients)
  });
