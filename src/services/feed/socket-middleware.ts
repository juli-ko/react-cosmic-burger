import {
	ActionCreatorWithoutPayload,
	ActionCreatorWithPayload,
	Middleware,
} from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TWsActions<R> = {
	connect: ActionCreatorWithPayload<string>;
	disconnect: ActionCreatorWithoutPayload;
	onError: ActionCreatorWithPayload<string>;
	onMessage: ActionCreatorWithPayload<R>;
};

export const socketMiddleware = <R>(
	wsActions: TWsActions<R>
): Middleware<object, RootState> => {
	return (store) => {
		let socket: WebSocket | null = null;
		const { connect, disconnect, onError, onMessage } = wsActions;
		const { dispatch } = store;
		let url = '';

		return (next) => (action) => {
			if (connect.match(action)) {
				url = action.payload;
				socket = new WebSocket(url);

				socket.onerror = () => {
					dispatch(onError('Unknown error'));
				};

				socket.onmessage = (event) => {
					const { data } = event;
					try {
						const parsedData = JSON.parse(data);
						dispatch(onMessage(parsedData));
					} catch (error) {
						dispatch(onError((error as Error).message));
					}
				};

				return;
			} else if (disconnect.match(action)) {
				console.log('Disconnecting WebSocket disconnect.match(action)');
				socket?.close();
				socket = null;

				return;
			}

			next(action);
		};
	};
};
