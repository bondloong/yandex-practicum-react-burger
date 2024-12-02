import { createSlice } from '@reduxjs/toolkit';
import { IIngredient, IIngredientsData } from '../../utils/prop-types';

interface IIIngredientDetailsState {
	data: IIngredient | null;
}

const initialState: IIIngredientDetailsState = { data: null };

const ingredientDetailsSlice = createSlice({
	name: 'ingredientDetails',
	initialState,
	reducers: {
		setData: (state, action) => ({ ...state, data: action.payload }),
		resetData: (state) => ({ ...state, data: null }),
	},
});

export const { setData, resetData } = ingredientDetailsSlice.actions;

export default ingredientDetailsSlice;
