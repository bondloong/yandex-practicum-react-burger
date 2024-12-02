// burger-constructor-slice.ts
import { createSlice, PayloadAction, Draft } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { IIngredient } from '../../utils/prop-types';

interface BurgerConstructorState {
	bun: IIngredient | null;
	ingredients: IIngredient[];
}

const initialState: BurgerConstructorState = {
	bun: null,
	ingredients: [],
};

const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		addIngredient: {
			reducer: (
				state: Draft<BurgerConstructorState>,
				action: PayloadAction<IIngredient>
			) => {
				if (action.payload.type === 'bun') {
					state.bun = action.payload;
				} else {
					state.ingredients.push(action.payload);
				}
			},
			prepare: (ingredient: IIngredient) => ({
				payload: { ...ingredient, id: nanoid() },
			}),
		},
		removeIngredient: (
			state: Draft<BurgerConstructorState>,
			action: PayloadAction<{ id: string }>
		) => {
			state.ingredients = state.ingredients.filter(
				(ingredient: IIngredient) => ingredient.id !== action.payload.id
			);
		},
		sortIngredients: (
			state: Draft<BurgerConstructorState>,
			action: PayloadAction<{ fromIndex: number; toIndex: number }>
		) => {
			const { fromIndex, toIndex } = action.payload;
			const ingredients = state.ingredients;
			const [movedIngredient] = ingredients.splice(fromIndex, 1);
			ingredients.splice(toIndex, 0, movedIngredient);
		},
	},
});

export const { addIngredient, removeIngredient, sortIngredients } =
	burgerConstructorSlice.actions;

export default burgerConstructorSlice;
