import { useEffect } from 'react';
import OrderFeed from '../../components/order-feed/order-feed';
import { useAppDispatch, useSelector } from '../../hooks/redux-hooks';
import { connect, disconnect } from '../../services/feed/order-feed/actions';
import styles from './Feed.module.scss';
import {
	getAllOrders,
	getTotalOrders,
	getTotalToday,
} from '../../services/feed/order-feed/orderFeedSlice';

const ORDERS_FEED_URL = 'wss://norma.nomoreparties.space/orders/all';

export const Feed = () => {
	const dispatch = useAppDispatch();
	const ordersAll = useSelector(getAllOrders);
	const ordersReady = ordersAll
		.filter((order) => order.status === 'done')
		.map((order) => order.number)
		.slice(0, 5);
	const ordersInProgress = ordersAll
		.filter((order) => order.status === 'pending')
		.map((order) => order.number)
		.slice(0, 5);
	const totalOrders = useSelector(getTotalOrders);
	const todayOrders = useSelector(getTotalToday);

	useEffect(() => {
		dispatch(connect(ORDERS_FEED_URL));

		return () => {
			dispatch(disconnect());
		};
	}, []);

	return (
		<main className={styles.main}>
			<div className={styles.wrapper}>
				<div className='mr-5 ml-5'>
					<h1 className='text text_type_main-large mb-5 mt-10'>
						Лента заказов
					</h1>
					<OrderFeed orders={ordersAll} />
				</div>
				<section className={`${styles.feedInfo} ml-15 mt-25`}>
					<div className={styles.progress}>
						<div className='mr-9'>
							<p className='text text_type_main-medium mb-6'>Готовы:</p>
							{ordersReady.map((num) => (
								<p
									key={num}
									className={`${styles.ready} text text_type_digits-default mt-2`}>
									{num}
								</p>
							))}
						</div>
						<div>
							<p className='text text_type_main-medium mb-6'>В работе:</p>
							{ordersInProgress.map((num) => (
								<p key={num} className={`text text_type_digits-default mt-2`}>
									{num}
								</p>
							))}
						</div>
					</div>
					<p className='text text_type_main-medium mt-15'>
						Выполнено за все время:
					</p>
					<p className={`${styles.numbers} text text_type_digits-large`}>
						{totalOrders}
					</p>
					<p className='text text_type_main-medium mt-15'>
						Выполнено за сегодня:
					</p>
					<p className={`${styles.numbers} text text_type_digits-large`}>
						{todayOrders}
					</p>
				</section>
			</div>
		</main>
	);
};
