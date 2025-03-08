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

export const fetchForgotPassword = (email) => {
	return request('/password-reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email }),
	});
};

export const fetchResetPassword = (password, token) => {
	return request('/password-reset/reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ password, token }),
	});
};

export const fetchRegister = (email, password, name) => {
	return request('/auth/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password, name }),
	});
};

export const fetchLogin = (email, password) => {
	return request('/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});
};

export const fetchLogout = () => {
	return request('/auth/logout', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token: `${localStorage.getItem('refreshToken')}` }),
	});
};

export const fetchRefreshToken = () => {
	return request('/auth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token: `${localStorage.getItem('refreshToken')}` }),
	});
};

export const fetchGetUser = () => {
	return request('/auth/user', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
		},
	});
};

export const fetchRefreshUser = (userData) => {
	return request('/auth/user', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
		},
		body: JSON.stringify(userData),
	});
};
