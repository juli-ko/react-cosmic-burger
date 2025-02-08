const API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const fetchIngredients = () => {
	return fetch(`${API_URL}/ingredients`).then(checkResponse);
};

export const fetchOrder = (idsArr) => {
	return fetch(`${API_URL}/orders`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			ingredients: idsArr,
		}),
	}).then(checkResponse);
};
