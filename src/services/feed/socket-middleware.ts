import {
	ActionCreatorWithoutPayload,
	ActionCreatorWithPayload,
	Middleware,
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import { refreshToken } from '../../utils/burger-api';

export type TWsActions<R> = {
	connect: ActionCreatorWithPayload<string>;
	disconnect: ActionCreatorWithoutPayload;
	onError: ActionCreatorWithPayload<string>;
	onMessage: ActionCreatorWithPayload<R>;
};

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = <R>(
	wsActions: TWsActions<R>,
	withTokenRefresh = false
): Middleware<object, RootState> => {
	return (store) => {
		let socket: WebSocket | null = null;
		const { connect, disconnect, onError, onMessage } = wsActions;
		const { dispatch } = store;
		let url = '';
		let isConnected = false;
		let reconnectId = 0;

		return (next) => (action) => {
			if (connect.match(action)) {
				url = action.payload;
				socket = new WebSocket(url);
				isConnected = true;

				socket.onerror = () => {
					dispatch(onError('Unknown error'));
				};

				socket.onclose = () => {
					if (isConnected) {
						reconnectId = window.setTimeout(() => {
							dispatch(connect(url));
						}, RECONNECT_PERIOD);
					}
				};

				socket.onmessage = (event) => {
					const { data } = event;
					try {
						const parsedData = JSON.parse(data);

						if (
							withTokenRefresh &&
							(parsedData.message === 'Invalid or missing token' ||
								parsedData.message === 'jwt expired')
						) {
							refreshToken()
								.then((refreshedData) => {
									const wssUrl = new URL(url);
									wssUrl.searchParams.set(
										'token',
										refreshedData.accessToken.replace('Bearer ', '')
									);
									dispatch(connect(wssUrl.toString()));
								})
								.catch((error) => {
									dispatch(onError((error as Error).message));
								});

							dispatch(disconnect());
							return;
						}

						dispatch(onMessage(parsedData));
					} catch (error) {
						dispatch(onError((error as Error).message));
					}
				};

				return;
			} else if (disconnect.match(action)) {
				clearTimeout(reconnectId);
				reconnectId = 0;
				isConnected = false;
				socket?.close();
				socket = null;
				console.log('fyhkdyk');

				return;
			}

			next(action);
		};
	};
};
