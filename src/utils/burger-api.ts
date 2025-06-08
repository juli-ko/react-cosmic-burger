import {
	TFormData,
	TAuthResponse,
	TRefreshTokenResponse,
	TOrderResponse,
	TResetPassResponse,
	TIngredientResponse,
	TOrderByNumberResponse,
} from './types';

const API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = <T>(res: Response): Promise<T> => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

function request<T>(url: string, options?: RequestInit): Promise<T> {
	return fetch(`${API_URL}${url}`, options).then(checkResponse<T>);
}

const fetchWithTokenSave = <T extends TRefreshTokenResponse>(
	url: string,
	options?: RequestInit
): Promise<T> => {
	return request<T>(url, options).then((data) => {
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

const fetchWithRefresh = async <T>(
	url: string,
	options?: RequestInit
): Promise<T> => {
	try {
		return await request(url, options);
	} catch (err) {
		if (err instanceof Error && err.message === 'jwt expired') {
			const refreshData = await refreshToken();
			const updatedOptions: RequestInit = {
				...options,
				headers: {
					...options?.headers,
					Authorization: `Bearer ${refreshData.accessToken}`,
				},
			};
			return await request<T>(url, updatedOptions); //повторяем запрос
		} else {
			return Promise.reject(err);
		}
	}
};

export const fetchIngredients = () =>
	request<TIngredientResponse>('/ingredients');

export const fetchOrder = (idsArr: Array<string>) => {
	return request<TOrderResponse>('/orders', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
		},
		body: JSON.stringify({
			ingredients: idsArr,
		}),
	});
};

export const forgotPassword = (email: string) => {
	return request<TResetPassResponse>('/password-reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email }),
	});
};

export const resetPassword = (
	formData: Pick<TFormData, 'password' | 'token'>
) => {
	return request<TResetPassResponse>('/password-reset/reset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});
};

export const fetchRegister = (
	formData: Pick<TFormData, 'name' | 'email' | 'password'>
) => {
	return fetchWithTokenSave<TAuthResponse>('/auth/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});
};

export const fetchLogin = (formData: Pick<TFormData, 'email' | 'password'>) => {
	return fetchWithTokenSave<TAuthResponse>('/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});
};

export const fetchLogout = () => {
	return request<TResetPassResponse>('/auth/logout', {
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
	return fetchWithTokenSave<TRefreshTokenResponse>('/auth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token: `${localStorage.getItem('refreshToken')}` }),
	});
};

export const getUser = () => {
	return fetchWithRefresh<Pick<TAuthResponse, 'success' | 'user'>>(
		'/auth/user',
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			},
		}
	);
};

export const refreshUser = (
	formData: Pick<TFormData, 'name' | 'email' | 'password'>
) => {
	return fetchWithRefresh<Pick<TAuthResponse, 'success' | 'user'>>(
		'/auth/user',
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			},
			body: JSON.stringify(formData),
		}
	);
};

export const fetchOrderByNumber = (id: string) => {
	return request<TOrderByNumberResponse>(`/orders/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
