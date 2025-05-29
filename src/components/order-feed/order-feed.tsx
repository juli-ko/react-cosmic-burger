import OrderCard from '../order-card/order-card';
import styles from './order-feed.module.scss';

const OrderFeed = () => {
	return (
		<section className={styles.feedList}>
			<OrderCard
				num={7755}
				dateFromServer='2022-10-10T17:33:32.877Z'
				status='Создан'
				price={345}
			/>
			<OrderCard
				num={7755}
				dateFromServer='2022-10-10T17:33:32.877Z'
				status='Создан'
				price={345}
			/>
			<OrderCard
				num={7755}
				dateFromServer='2022-10-10T17:33:32.877Z'
				status='Создан'
				price={345}
			/>
			<OrderCard
				num={7755}
				dateFromServer='2022-10-10T17:33:32.877Z'
				status='Создан'
				price={345}
			/>
		</section>
	);
};

export default OrderFeed;
