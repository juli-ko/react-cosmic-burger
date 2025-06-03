import styles from './order-info.module.scss';
import bun from '../../images/bun.png';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientIcon from '../../components/ingredient-icon/ingredient-icon';
import { useParams } from 'react-router-dom';
import { TOrder } from '../../utils/types';
import { useAppDispatch, useSelector } from '../../hooks/redux-hooks';
import { useEffect } from 'react';
import { getOrderByNumber } from '../../services/orderDetailsSlice';
import { RootState } from '../../services/store';

const OrderInfo = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();

	let order = useSelector((state: RootState): TOrder | undefined | null => {
		if (order) return order;

		order = state.orderFeed.orders.find((order) => order.number === Number(id));
		if (order) return order;

		order = state.profileFeed.orders.find(
			(order) => order.number === Number(id)
		);
		if (order) return order;

		return state.orders.orderDetails;
	});

	useEffect(() => {
		if (!order && id) {
			dispatch(getOrderByNumber(id));
		}
	});

	if (!order) {
		return (
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<p>Загружаюсь...</p>
				</div>
			</div>
		);
	}
	const price = 423;
	const amount = 1;

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<p className='text text_type_digits-default'>{`#${id}`}</p>
				<p className='text text_type_main-medium mt-10 mb-3'>{order.name}</p>
				<p className={`text text_type_main-small mb-15 ${styles.ready}`}>
					Выполнен
				</p>
				<p className='text text_type_main-medium mt-10 mb-6'>Состав:</p>
				<div className={`${styles.ingredientsBlock} mb-10 pr-6`}>
					<div className={styles.card}>
						<IngredientIcon img={bun} />
						<p className={`text text_type_main-small mr-4 ml-4 ${styles.name}`}>
							Флюоресцентная булка R2-D3
						</p>
						<div className={`${styles.currencyBlock} p-2`}>
							<span className='text text_type_digits-default mr-2'>
								{amount}
							</span>
							<span className='text text_type_main-small mr-2'>х</span>
							<span className='text text_type_digits-default mr-2'>{23}</span>
							<CurrencyIcon type='primary' />
						</div>
					</div>
				</div>
				<div className={`${styles.infoBlock} mb-4`}>
					<FormattedDate
						className='text text_type_main-default text_color_inactive'
						date={new Date(order.createdAt)}
					/>
					<div className={`${styles.currencyBlock} p-2`}>
						<span className='text text_type_digits-default mr-2'>{price}</span>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderInfo;
