import { initialState as burgerIngredientsInitialState } from './slices/burger-ingredients-slice';
import { initialState as burgerConstructorInitialState } from './slices/burger-сonstructor-slice';
import { initialState as ingredientDetailsInitialState } from './slices/ingredient-details-slice';
import { initialState as orderDetailsInitialState } from './slices/order-details-slice';
import { initialState as userInitialState } from './slices/user-slice';
import { initialState as webSocketInitialState } from './slices/websocket-slice';
import { WebsocketStatus } from '../types/websocket';

describe('store', () => {
	describe('preloaded state is equal to initial state of the slices', () => {
		const preloadedState = {
			burgerIngredients: { data: null, isLoading: false, isError: false },
			burgerConstructor: { bun: null, ingredients: [] },
			ingredientDetails: { data: null },
			orderDetails: { data: null, isLoading: false, isError: false },
			user: { user: null, isAuthChecked: false },
			webSocket: {
				status: WebsocketStatus.OFFLINE,
				orders: [],
				total: 0,
				totalToday: 0,
				error: '',
			},
		};

		it('burgerIngredients', () => {
			expect(preloadedState.burgerIngredients).toEqual(
				burgerIngredientsInitialState
			);
		});

		it('burgerConstructor', () => {
			expect(preloadedState.burgerConstructor).toEqual(
				burgerConstructorInitialState
			);
		});

		it('ingredientDetails', () => {
			expect(preloadedState.ingredientDetails).toEqual(
				ingredientDetailsInitialState
			);
		});

		it('orderDetails', () => {
			expect(preloadedState.orderDetails).toEqual(orderDetailsInitialState);
		});

		it('user', () => {
			expect(preloadedState.user).toEqual(userInitialState);
		});

		it('webSocket', () => {
			expect(preloadedState.webSocket).toEqual(webSocketInitialState);
		});
	});
});
