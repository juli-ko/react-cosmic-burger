import { combineReducers, configureStore } from '@reduxjs/toolkit';
import constructorReducer from './constructorSlice';
import ingredientsReducer from './ingredientsSlice';
import orderDetailsSliceReducer from './orderDetailsSlice';
import userReducer from './userSlice';
import orderFeedReducer from './feed/order-feed/orderFeedSlice';
import { socketMiddleware } from './feed/socket-middleware';
import {
	connect,
	disconnect,
	onError,
	onMessage,
} from './feed/order-feed/actions';
import profileFeedReducer from './feed/profile-feed/profileFeedSlice';
import {
	connectProfileOrders,
	disconnectProfileOrders,
	onErrorProfileOrders,
	onMessageProfileOrders,
} from './feed/profile-feed/actions';

const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	burgerConstructor: constructorReducer,
	orders: orderDetailsSliceReducer,
	user: userReducer,
	orderFeed: orderFeedReducer,
	profileFeed: profileFeedReducer,
});

const orderFeedMiddleware = socketMiddleware({
	connect,
	disconnect,
	onError,
	onMessage,
});

const profileFeedMiddleware = socketMiddleware(
	{
		connect: connectProfileOrders,
		disconnect: disconnectProfileOrders,
		onError: onErrorProfileOrders,
		onMessage: onMessageProfileOrders,
	},
	true
);

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(orderFeedMiddleware, profileFeedMiddleware),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
