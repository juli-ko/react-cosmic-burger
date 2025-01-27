const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

const checkResponse = (res) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const fetchIngredients = () => {
	return fetch(API_URL).then(checkResponse);
};
