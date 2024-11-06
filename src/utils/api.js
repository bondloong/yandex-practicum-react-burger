export default function request(endpoint, options) {
	const baseUrl = 'https://norma.nomoreparties.space/api/';
	const checkResponse = (res) => {
		return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
	};

	return fetch(`${baseUrl}${endpoint}`, options).then(checkResponse);
}

export const postOrder = (data) => {
	const options = {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	};

	return request('orders', options).then((data) => data.success && data);
};

export const fetchIngredients = () => {
	return request('ingredients').then((data) => data.success && data.data);
};