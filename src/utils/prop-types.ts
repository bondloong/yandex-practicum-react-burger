import { ReactNode } from 'react';
import { Ingredient } from '../types';

export interface IIngredientsData {
	isLoading: boolean;
	isError: boolean;
	data: Ingredient[] | null;
	success?: boolean;
}

export interface IOrderResponse {
	success: boolean;
	name: string;
	order: {
		number: number;
	};
}

export interface IOrderData {
	isLoading: boolean;
	isError: boolean;
	data: IOrderResponse | null;
}

export interface IModalProps {
	text?: string;
	onClose: () => void;
	children: ReactNode;
}

export interface IModalOverlayProps {
	onClick: (() => void) | null;
}

export interface IIngredientItemProps {
	ingredient: Ingredient;
	counter?: number;
}

export interface IIngredientListProps {
	ingredients: Ingredient[];
	title?: string;
	type?: string;
}

export interface IConstructorListProps {
	bun: Ingredient | null;
	ingredients: Ingredient[];
	onDropHandler: (item: IIngredientItemProps) => void;
}

export interface IConstructorItemProps {
	ingredient: Ingredient;
	moveIngredient: (id: string, atIndex: number) => void;
	findIngredient: (id: string) => {
		ingredient: Ingredient;
		index: number;
	};
}

interface IConstructorItemSkeletonAndBunProps {
	position?: 'top' | 'bottom';
	extraClass?: string;
}

export interface constructorItemSkeletonProps
	extends IConstructorItemSkeletonAndBunProps {
	text: string;
}

export interface constructorItemBunProps
	extends IConstructorItemSkeletonAndBunProps {
	ingredient: Ingredient;
}

export interface protectedRouteElementProps {
	component: ReactNode;
	onlyAuth: boolean;
}
