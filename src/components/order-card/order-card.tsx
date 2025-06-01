import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-card.module.scss';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import { Link, useLocation } from 'react-router-dom';
import { TOrder } from '../../utils/types';
import { useSelector } from '../../hooks/redux-hooks';
import { getIngredientsData } from '../../services/ingredientsSlice';

const ORDER_STATUS = [
	{ name: 'done', value: 'Выполнен' },
	{ name: 'cancelled', value: 'Отменен' },
	{ name: 'pending', value: 'Готовиться' },
	{ name: 'created', value: 'Создан' },
];

type TOrderCard = {
	order: TOrder;
};

const OrderCard = ({ order }: TOrderCard) => {
	const ingredientsInOrderIds = order.ingredients;
	const allIngredients = useSelector(getIngredientsData);
	const ingredientsImg: Array<string> = [];
	let ingredientsLength = 0;
	let orderPrice = 0;
	order.ingredients.forEach((id) => {
		const ingredientInfo = allIngredients.find((item) => item._id === id);
		if (ingredientInfo) {
			ingredientsImg.push(ingredientInfo.image_mobile);
			orderPrice += ingredientInfo.price;
			ingredientsLength += 1;
		}
	});

	const location = useLocation();
	const orderStatus =
		ORDER_STATUS.find((status) => status.name === order.status)?.value ||
		'Неизвестный статус';

	return (
		<Link
			to={`${location.pathname}/${order.number}`}
			state={{ background: location }}>
			<div className={`${styles.card} p-6 mb-4 mr-2`}>
				<div className={`${styles.info} mb-6`}>
					<p className='text text_type_digits-default'>{`#${order.number}`}</p>
					<FormattedDate
						className='text text_type_main-default text_color_inactive'
						date={new Date(order.createdAt)}
					/>
				</div>
				<h3 className='text text_type_main-medium mb-2'>{order.name}</h3>
				<p className='text text_type_main-default mb-6'>{orderStatus}</p>
				<div className={`${styles.ingredientsBlock}`}>
					<div className={`${styles.ingredients}`}>
						{ingredientsImg.slice(0, 5).map((image, index) => (
							<IngredientIcon
								img={image}
								index={index}
								key={index}
								rest={ingredientsLength - 5}
							/>
						))}
					</div>
					<div className={`${styles.currencyBlock} p-2`}>
						<span className='text text_type_digits-default mr-2'>
							{orderPrice}
						</span>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</div>
		</Link>
	);
};

export default OrderCard;
