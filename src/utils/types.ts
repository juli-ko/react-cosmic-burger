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

export type TConstructorIngredient = TIngredient & {
	key: string;
};

export type TFormData = {
	name: string;
	email: string;
	password: string;
	token: string;
};

type TResponse = {
	success: boolean;
};

export type TUser = {
	email: string;
	name: string;
};

export type TIngredientResponse = TResponse & {
	data: TData;
};

export type TAuthResponse = TResponse & {
	user: TUser;
	accessToken: string;
	refreshToken: string;
};

export type TRefreshTokenResponse = TResponse & {
	refreshToken: string;
	accessToken: string;
};

export type TOrderResponse = TResponse & {
	order: {
		number: number;
	};
};

export type TResetPassResponse = TResponse & {
	message: string;
};

export type TOrder = {
	ingredients: string[];
	_id: string;
	name: string;
	status: 'created' | 'pending' | 'done' | 'cancelled';
	number: number;
	createdAt: string;
	updatedAt: string;
};

export type TOrdersAllResponse = {
	success: boolean;
	orders: TOrder[];
	total: number;
	totalToday: number;
};

export type TOrderByNumberResponse = TResponse & {
	orders: TOrder[];
};
