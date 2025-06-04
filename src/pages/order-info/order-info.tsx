import styles from './order-info.module.scss';
import loader from '../../images/loader.svg';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientIcon from '../../components/ingredient-icon/ingredient-icon';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { useEffect } from 'react';
import { getOrderByNumber } from '../../services/orderDetailsSlice';
import { useOrder } from '../../hooks/useOrder';
import { useOrderDetails } from '../../hooks/useOrderDetails';

const OrderInfo = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const order = useOrder();
	const { orderStatus, orderPrice, ingredients } = useOrderDetails(order);

	useEffect(() => {
		if (!order && id) {
			dispatch(getOrderByNumber(id));
		}
	}, [order, id, dispatch]);

	if (!order) {
		return (
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<p>Загружаюсь...</p>
					<img src={loader} alt='loader' />
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<p className='text text_type_digits-default'>{`#${id}`}</p>
				<p className='text text_type_main-medium mt-10 mb-3'>{order.name}</p>
				<p className={`text text_type_main-small mb-15 ${styles.ready}`}>
					{orderStatus}
				</p>
				<p className='text text_type_main-medium mt-10 mb-6'>Состав:</p>
				<div className={`${styles.ingredientsBlock} mb-10 pr-6`}>
					{ingredients.map((ingredient, index) => (
						<div className={styles.card} key={index}>
							<IngredientIcon img={ingredient.ingredient.image_mobile} />
							<p
								className={`text text_type_main-small mr-2 ml-2 ${styles.name}`}>
								{ingredient.ingredient.name}
							</p>
							<div className={`${styles.currencyBlock} p-2`}>
								<span className='text text_type_digits-default mr-2'>
									{ingredient.count}
								</span>
								<span className='text text_type_main-small mr-2'>х</span>
								<span className='text text_type_digits-default mr-2'>
									{ingredient.ingredient.price}
								</span>
								<CurrencyIcon type='primary' />
							</div>
						</div>
					))}
				</div>
				<div className={`${styles.infoBlock} mb-4`}>
					<FormattedDate
						className='text text_type_main-default text_color_inactive'
						date={new Date(order.createdAt)}
					/>
					<div className={`${styles.currencyBlock} p-2`}>
						<span className='text text_type_digits-default mr-2'>
							{orderPrice}
						</span>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderInfo;
