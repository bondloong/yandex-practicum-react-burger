export interface Ingredient {
	_id: string;
	name: string;
	type: IngredientType;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
}

export type Ingredients = Array<Ingredient>;

export interface ConstructorIngredient extends Ingredient {
	id: string;
}

export type ConstructorIngredients = Array<ConstructorIngredient>;

export interface IngredientWithAmount extends Ingredient {
	amount: number;
}

export type ConstructorItemType = 'top' | 'bottom';

export type IngredientType = 'bun' | 'sauce' | 'main';

export interface FormData {
	[name: string]: string;
}

export interface ArrayData {
	[name: string]: Array<string>;
}

export interface Order {
	ingredients: string[];
	_id: string;
	status: 'done' | 'pending' | 'created';
	name: string;
	createdAt: string;
	updatedAt: string;
	number: number;
	owner?: Owner;
	price?: number;
}

export type Orders = Array<Order>;

export interface User {
	email: string;
	name: string;
}

export interface Owner extends User {
	createdAt: string;
	updatedAt: string;
}

export enum Statuses {
	done = 'Выполнен',
	created = 'Создан',
	pending = 'Готовится',
	canceled = 'Отменен',
}
