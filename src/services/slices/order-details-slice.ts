import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postOrder } from '../../utils/api';
import { IOrderData, IOrderResponse } from '../../utils/prop-types';

const initialState: IOrderData = {
	data: null,
	isLoading: false,
	isError: false,
};

export const sendOrder = createAsyncThunk<
	IOrderResponse,
	{ ingredients: string[] }
>('orderDetails/sendOrder', postOrder);

const orderDetailsSlice = createSlice({
	name: 'orderDetails',
	initialState,
	reducers: {
		clearOrder: (state) => ({
			...state,
			isLoading: false,
			isError: false,
			data: null,
		}),
	},
	extraReducers: (builder) => {
		builder.addCase(sendOrder.pending, (state) => ({
			...state,
			isLoading: true,
			isError: false,
			data: null,
		}));
		builder.addCase(sendOrder.fulfilled, (state, action) => ({
			...state,
			isLoading: false,
			isError: false,
			data: action.payload,
		}));
		builder.addCase(sendOrder.rejected, (state) => ({
			...state,
			isLoading: false,
			isError: true,
			data: null,
		}));
	},
});

export const { clearOrder } = orderDetailsSlice.actions;

export default orderDetailsSlice;
