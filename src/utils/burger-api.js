const API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

function request(url, options) {
	return fetch(`${API_URL}${url}`, options).then(checkResponse);
}

export const fetchIngredients = () => {
	return request('/ingredients');
};

export const fetchOrder = (idsArr) => {
	return request('/orders', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			ingredients: idsArr,
		}),
	});
};
