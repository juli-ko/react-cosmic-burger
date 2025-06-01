import { TOrder } from '../../utils/types';
import OrderCard from '../order-card/order-card';
import styles from './order-feed.module.scss';

type TOrderFeed = {
	orders: TOrder[];
};

const OrderFeed = ({ orders }: TOrderFeed) => {
	return (
		<section className={styles.feedList}>
			{orders.map((order) => (
				<OrderCard key={order._id} order={order} />
			))}
		</section>
	);
};

export default OrderFeed;
