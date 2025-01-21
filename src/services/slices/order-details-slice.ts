import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { requestGetOrder, requestSendOrder } from '../../utils/api';
import { Order } from '../../types/common';
import { OrderDetailsStore } from '../../types/store';

const initialState = {
	data: null,
	isLoading: false,
	isError: false,
} satisfies OrderDetailsStore as OrderDetailsStore;

export const sendOrder = createAsyncThunk(
	'orderDetails/sendOrder',
	requestSendOrder
);
export const getOrder = createAsyncThunk(
	'orderDetails/getOrder',
	requestGetOrder
);

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
		updateOrder: (state, action: PayloadAction<Order>) => ({
			...state,
			data: action.payload,
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
		builder.addCase(getOrder.pending, (state) => ({
			...state,
			isLoading: true,
			isError: false,
			data: null,
		}));
		builder.addCase(getOrder.fulfilled, (state, action) => ({
			...state,
			isLoading: false,
			isError: false,
			data: action.payload,
		}));
		builder.addCase(getOrder.rejected, (state) => ({
			...state,
			isLoading: false,
			isError: true,
			data: null,
		}));
	},
});

export const { clearOrder, updateOrder } = orderDetailsSlice.actions;

type orderDetailsActionCreators = typeof orderDetailsSlice.actions;
export type orderDetailsActions = ReturnType<
	orderDetailsActionCreators[keyof orderDetailsActionCreators]
>;

export default orderDetailsSlice;
