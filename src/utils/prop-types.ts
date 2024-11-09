export interface IIngredient {
	id: string,
	_id: string,
	name: string,
	type: string,
	proteins?: number,
	fat?: number,
	carbohydrates?: number,
	calories?: number,
	price?: number,
	image?: string,
	image_mobile?: string,
	image_large?: string,
	__v?: number, 
}

export interface IIngredientsData {
	isLoading: boolean,
	isError: boolean,
	data: IIngredient[] | null
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

export interface modalProps {
	text?: string,
	closeModal: () => void,
	children: React.ReactNode
}

export interface modalOverlayProps {
	onClick: (() => void) | null
}

export interface ingredientItemProps {
	ingredient: IIngredient,
	counter?: number;
}

export interface ingredientListProps {
    ingredients: IIngredient[],
	title?: string,
	type?: string,
}

export interface constructorListProps {
	bun: IIngredient | null;
	ingredients: IIngredient[];
	onDropHandler: (item: ingredientItemProps) => void;
}

export interface constructorItemProps {
	ingredient: IIngredient,
	moveIngredient: (id: string, atIndex: number) => void,
	findIngredient: (id: string) => {
		ingredient: IIngredient;
		index: number;
	},
}

interface constructorItemSkeletonAndBunProps {
	position?: 'top' | 'bottom',
	extraClass?: string,
};

export interface constructorItemSkeletonProps extends constructorItemSkeletonAndBunProps {
	text: string;
}

export interface constructorItemBunProps extends constructorItemSkeletonAndBunProps {
	ingredient: IIngredient;
}