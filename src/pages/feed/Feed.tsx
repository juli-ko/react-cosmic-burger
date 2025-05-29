import OrderFeed from '../../components/order-feed/order-feed';
import styles from './Feed.module.scss';

export const Feed = () => {
	const ordersReady = [134533, 134533, 134533, 134533, 134533];
	const ordersInProgress = [134533, 134533, 134533];
	return (
		<main className={styles.main}>
			<div className={styles.wrapper}>
				<div className='mr-5 ml-5'>
					<h1 className='text text_type_main-large mb-5 mt-10'>
						Лента заказов
					</h1>
					<OrderFeed />
				</div>
				<section className={`${styles.feedInfo} ml-15 mt-25`}>
					<div className={styles.progress}>
						<div className='mr-9'>
							<p className='text text_type_main-medium mb-6'>Готовы:</p>
							{ordersReady.map((num) => (
								<p
									className={`${styles.ready} text text_type_digits-default mt-2`}>
									{num}
								</p>
							))}
						</div>
						<div>
							<p className='text text_type_main-medium mb-6'>В работе:</p>
							{ordersInProgress.map((num) => (
								<p className={`text text_type_digits-default mt-2`}>{num}</p>
							))}
						</div>
					</div>
					<p className='text text_type_main-medium mt-15'>
						Выполнено за все время:
					</p>
					<p className={`${styles.numbers} text text_type_digits-large`}>
						28 752
					</p>
					<p className='text text_type_main-medium mt-15'>
						Выполнено за сегодня:
					</p>
					<p className={`${styles.numbers} text text_type_digits-large`}>252</p>
				</section>
			</div>
		</main>
	);
};
