import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-card.module.scss';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import { Link, useLocation } from 'react-router-dom';
import { TOrder } from '../../utils/types';
import { useOrderDetails } from '../../hooks/useOrderDetails';

type TOrderCard = {
	order: TOrder;
};

const OrderCard = ({ order }: TOrderCard) => {
	const location = useLocation();
	const { orderStatus, orderPrice, ingredientsImg, ingredients } =
		useOrderDetails(order);

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
								rest={ingredients.length - 5}
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
