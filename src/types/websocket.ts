import { Orders } from './common';

export interface WSOrderResponse {
	success: boolean;
	orders: Orders;
	total: number;
	totalToday: number;
}

export enum WebsocketStatus {
	OPENING = 'opening...',
	CLOSING = 'closing...',
	ONLINE = 'online',
	OFFLINE = 'offline',
}
