import {
	ConstructorIngredient,
	ConstructorIngredients,
	Ingredient,
	Ingredients,
	Order,
	Orders,
	User,
} from './common';
import { WebsocketStatus } from './websocket';

export interface BurgerConstructorStore {
	bun: ConstructorIngredient | null;
	ingredients: ConstructorIngredients;
}

export interface UserStore {
	user: User | null;
	isAuthChecked: boolean;
}

export interface BurgerIngredientStore {
	data: Ingredients | null;
	isLoading: boolean;
	isError: boolean;
}

export interface IngredientDetailsStore {
	data: Ingredient | null;
}

export interface OrderDetailsStore {
	data: Order | null;
	isLoading: boolean;
	isError: boolean;
}

export interface WebSocketStore {
	status: WebsocketStatus;
	orders: Orders;
	total: number;
	totalToday: number;
	error: string;
}
