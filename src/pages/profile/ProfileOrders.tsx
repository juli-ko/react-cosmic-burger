import { useEffect } from 'react';
import OrderFeed from '../../components/order-feed/order-feed';
import { useAppDispatch, useSelector } from '../../hooks/redux-hooks';
import {
	connectProfileOrders,
	disconnectProfileOrders,
} from '../../services/feed/profile-feed/actions';
import styles from './Profile.module.scss';
import { getAllOrders } from '../../services/feed/profile-feed/profileFeedSlice';

const PROFILE_FEED_URL = 'wss://norma.nomoreparties.space/orders';

export const ProfileOrders = () => {
	const dispatch = useAppDispatch();
	const url = `${PROFILE_FEED_URL}?token=${localStorage.accessToken}`;
	const orders = useSelector(getAllOrders);

	useEffect(() => {
		dispatch(connectProfileOrders(url));

		return () => {
			dispatch(disconnectProfileOrders());
		};
	}, [url]);

	return (
		<div className={`${styles.wrapper} mt-15`}>
			<OrderFeed orders={orders} />
		</div>
	);
};
