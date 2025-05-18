import OrderCard from '../../components/order-card/order-card';
import styles from './Profile.module.scss';

export const ProfileOrders = () => {
	return (
		<div className={`${styles.wrapper} mt-9`}>
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
		</div>
	);
};
