import { createAction } from '@reduxjs/toolkit';
import { TOrdersAllResponse } from '../../utils/types';

export const connect = createAction<string, 'orderFeed/connect'>(
	'orderFeed/connect'
);
export const onError = createAction<string, 'orderFeed/onError'>(
	'orderFeed/onError'
);
export const onMessage = createAction<
	TOrdersAllResponse,
	'orderFeed/onMessage'
>('orderFeed/onMessage');
export const disconnect = createAction('orderFeed/disconnect');

export type FeedActionTypes =
	| ReturnType<typeof connect>
	| ReturnType<typeof disconnect>
	| ReturnType<typeof onError>
	| ReturnType<typeof onMessage>;
