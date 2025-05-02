export type TIngredient = {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
	counter: number;
};

export type TData = Array<TIngredient>;

export type TFormData = {
	name: string;
	email: string;
	password: string;
	token: string;
};

type TResponse = {
	success: boolean;
};
export type TAuthResponse = TResponse & {
	user?: {
		email: string;
		name: string;
	};
	accessToken?: string;
	refreshToken?: string;
};

export type TRefreshTokenResponse = TResponse & {
	refreshToken?: string;
	accessToken?: string;
};

export type TOrderResponse = TResponse & {
	order: {
		number: number;
	};
};

export type TResetPassResponse = TResponse & {
	message: string;
};
