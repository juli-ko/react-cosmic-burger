const API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

function request(url, options) {
	return fetch(`${API_URL}${url}`, options).then(checkResponse);
}

const fetchWithTokenSave = (url, options) => {
	return request(url, options).then((data) => {
		if (!data.success) {
			return Promise.reject(data);
		}
		if (data.refreshToken && data.accessToken) {
			localStorage.setItem('refreshToken', data.refreshToken);
			localStorage.setItem(
				'accessToken',
				data.accessToken.replace('Bearer ', '')
			);
		}
		return data;
	});
};

const fetchWithRefresh = async (url, options) => {
	try {
		return await request(url, options);
	} catch (err) {
		if (err.message === 'jwt expired') {
			const refreshData = await refreshToken();
			options.headers = {
				...options.headers,
				Authorization: `Bearer ${refreshData.accessToken}`,
			};
			return await request(url, options); //повторяем запрос
		} else {
			return Promise.reject(err);
		}
	}
};

export const fetchIngredients = () => request('/ingredients');

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

export const forgotPassword = (email) => {
	return request('/password-reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email }),
	});
};

export const resetPassword = (formData) => {
	return request('/password-reset/reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});
};

export const fetchRegister = ({ email, password, name }) => {
	return fetchWithTokenSave('/auth/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password, name }),
	});
};

export const fetchLogin = ({ email, password }) => {
	return fetchWithTokenSave('/auth/login', {
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
	}).then((data) => {
		if (!data.success) {
			return Promise.reject(data);
		}
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('accessToken');
		return data;
	});
};

export const refreshToken = () => {
	return fetchWithTokenSave('/auth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token: `${localStorage.getItem('refreshToken')}` }),
	});
};

export const getUser = () => {
	return fetchWithRefresh('/auth/user', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
		},
	});
};

export const refreshUser = (userData) => {
	return fetchWithRefresh('/auth/user', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
		},
		body: JSON.stringify(userData),
	});
};
