import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { ConstructorIngredient, Ingredient } from '../../types';
import { BurgerConstructorStore } from '../../types/store';

const initialState = {
	bun: null,
	ingredients: [],
} satisfies BurgerConstructorStore as BurgerConstructorStore;

const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		addIngredient: {
			reducer: (state, action: PayloadAction<ConstructorIngredient>) =>
				action.payload.type === 'bun'
					? { ...state, bun: action.payload }
					: { ...state, ingredients: [...state.ingredients, action.payload] },
			prepare: (ingredient: Ingredient) => ({
				payload: { ...ingredient, id: nanoid() },
			}),
		},
		removeIngredient: (
			state,
			action: PayloadAction<ConstructorIngredient>
		) => ({
			...state,
			ingredients: state.ingredients.filter(
				(ingredient) => ingredient.id !== action.payload.id
			),
		}),
		sortIngredients: (
			state,
			action: PayloadAction<{ fromIndex: number; toIndex: number }>
		) => {
			const ingredients = [...state.ingredients];
			const { fromIndex, toIndex } = action.payload;
			ingredients.splice(toIndex, 0, ingredients.splice(fromIndex, 1)[0]);
			return { ...state, ingredients };
		},
		clearConstructor: () => ({ ...initialState }),
	},
});

export const {
	addIngredient,
	removeIngredient,
	sortIngredients,
	clearConstructor,
} = burgerConstructorSlice.actions;

type burgerConstructorActionCreators = typeof burgerConstructorSlice.actions;
export type burgerConstructorActions = ReturnType<
	burgerConstructorActionCreators[keyof burgerConstructorActionCreators]
>;

export default burgerConstructorSlice;
