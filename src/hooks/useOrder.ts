import { useParams } from 'react-router-dom';
import { TOrder } from '../utils/types';
import { RootState } from '../services/store';
import { useSelector } from 'react-redux';

export const useOrder = (): TOrder | undefined | null => {
	const { id } = useParams();

	return useSelector((state: RootState): TOrder | undefined | null => {
		const orderId = Number(id);

		let order = state.orderFeed.orders.find(
			(order) => order.number === orderId
		);
		if (order) return order;

		order = state.profileFeed.orders.find((order) => order.number === orderId);
		if (order) return order;

		return state.orders.orderDetails;
	});
};
