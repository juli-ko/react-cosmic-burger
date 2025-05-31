import { combineReducers, configureStore } from '@reduxjs/toolkit';
import constructorReducer from './constructorSlice';
import ingredientsReducer from './ingredientsSlice';
import orderDetailsSliceReducer from './orderDetailsSlice';
import userReducer from './userSlice';
import orderFeedReducer from './order-feed/orderFeedSlice';
import { socketMiddleware } from './middleware/socket-middleware';
import { connect, disconnect, onError, onMessage } from './order-feed/actions';

const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	burgerConstructor: constructorReducer,
	orders: orderDetailsSliceReducer,
	user: userReducer,
	orderFeed: orderFeedReducer,
});

const orderFeedMiddleware = socketMiddleware({
	connect,
	disconnect,
	onError,
	onMessage,
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(orderFeedMiddleware),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
