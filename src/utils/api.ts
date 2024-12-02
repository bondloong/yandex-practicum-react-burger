import { IIngredient, IIngredientsData, IOrderResponse } from './prop-types';

export default function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
	const baseUrl = 'https://norma.nomoreparties.space/api/';
	const checkResponse = (res: Response): Promise<T> => {
		return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
	};
	return fetch(`${baseUrl}${endpoint}`, options).then(checkResponse);
}

export const postOrder = (orderData: { ingredients: string[] }): Promise<IOrderResponse> => {
	const options: RequestInit = {
		method: 'POST',
		body: JSON.stringify(orderData),
		headers: {
			'Content-Type': 'application/json',
		},
	};

	return request<IOrderResponse>('orders', options).then((data) => {
		if (data.success) {
			return data;
		} else {
			return Promise.reject('Order not successful');
		}
	});
};

export const fetchIngredients = (): Promise<IIngredient[] | null> => {
	return request<IIngredientsData>('ingredients').then((data) => (data.success ? data.data : []));
};
