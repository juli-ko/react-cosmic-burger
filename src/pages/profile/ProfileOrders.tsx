import OrderFeed from '../../components/order-feed/order-feed';
import styles from './Profile.module.scss';

export const ProfileOrders = () => {
	return (
		<div className={`${styles.wrapper} mt-15`}>
			<OrderFeed />
		</div>
	);
};
