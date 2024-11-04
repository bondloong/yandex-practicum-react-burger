export interface IIngredient {
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


export interface IingredientsData {
	isLoading: boolean,
	isError: boolean,
	data: IIngredient[] | null

}

export interface modalProps {
	text?: string,
	closeModal: () => void,
	children: React.ReactNode
}

export interface modalOverlayProps {
	onClick: () => void
}

export interface ingredientItemProps {
	ingredient: IIngredient,
	counter?: number;
}

export interface ingredientListProps {
    ingredients: IIngredient[],
	name?: string,
	type?: string,
}

export interface constructorItemProps {
	ingredient: IIngredient,
	type?: "top" | "bottom";
	extraClass?: string,
}
