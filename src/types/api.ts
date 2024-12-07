import { ArrayData, FormData, Ingredients, Order, User } from './common';

export type ServerResponse = {
	success: boolean;
};

export type ServerResponseGeneric<T> = ServerResponse & T;

export type ServerMessageResponse = ServerResponseGeneric<{
	message: string;
}>;

export type ServerRefreshResponse = ServerResponseGeneric<{
	refreshToken: string;
	accessToken: string;
}>;

export type ServerUserResponse = ServerRefreshResponse & {
	user: User;
};

export type ServerIngredientsResponse = ServerResponseGeneric<{
	data: Ingredients;
}>;

export type ServerOrderResponse = ServerResponseGeneric<{
	name: string;
	order: Order;
}>;

export type HTTPMethods = 'GET' | 'POST' | 'PATCH';

export interface Options {
	method?: HTTPMethods;
	body?: string;
	headers: {
		'Content-Type'?: string;
		authorization?: string;
	};
}

export type RequestData = FormData | ArrayData;
