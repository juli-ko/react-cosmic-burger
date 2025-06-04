import { useSelector } from 'react-redux';
import { getIngredientsData } from '../services/ingredientsSlice';
import { TIngredient, TOrder } from '../utils/types';

const ORDER_STATUS = [
	{ name: 'done', value: 'Выполнен' },
	{ name: 'cancelled', value: 'Отменен' },
	{ name: 'pending', value: 'Готовиться' },
	{ name: 'created', value: 'Создан' },
];

export const useOrderDetails = (order: TOrder | null | undefined) => {
	const allIngredients = useSelector(getIngredientsData);

	if (!order) {
		return {
			orderStatus: '',
			orderPrice: 0,
			ingredients: [],
			ingredientsImg: [],
		};
	}

	const ingredientsMap = new Map<
		string,
		{ ingredient: TIngredient; count: number }
	>();

	order.ingredients.forEach((id) => {
		const ingredientInfo = allIngredients.find((item) => item._id === id);
		if (ingredientInfo) {
			if (!ingredientsMap.has(id)) {
				ingredientsMap.set(id, { ingredient: ingredientInfo, count: 1 });
			} else {
				const existing = ingredientsMap.get(id)!;
				ingredientsMap.set(id, {
					ingredient: existing.ingredient,
					count: existing.count + 1,
				});
			}
		}
	});

	const ingredients = Array.from(ingredientsMap.values());

	const orderPrice = ingredients.reduce(
		(total, { ingredient, count }) => total + ingredient.price * count,
		0
	);

	const ingredientsImg = ingredients.map(
		({ ingredient }) => ingredient.image_mobile
	);

	const orderStatus =
		ORDER_STATUS.find((status) => status.name === order.status)?.value ||
		'Неизвестный статус';

	return { orderStatus, orderPrice, ingredients, ingredientsImg };
};
