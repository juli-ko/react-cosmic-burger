import { createAction } from '@reduxjs/toolkit';
import { TOrdersAllResponse } from '../../../utils/types';

export const connectProfileOrders = createAction<string, 'profileFeed/connect'>(
	'profileFeed/connect'
);
export const onErrorProfileOrders = createAction<string, 'profileFeed/onError'>(
	'profileFeed/onError'
);
export const onMessageProfileOrders = createAction<
	TOrdersAllResponse,
	'profileFeed/onMessage'
>('profileFeed/onMessage');
export const disconnectProfileOrders = createAction('profileFeed/disconnect');
