import { orderDetailsActions } from './../../../../sprint-4/src/services/slices/order-details-slice';
import { combineSlices, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import burgerIngredientsSlice from './burger-ingredients-slice';
import burgerConstructorSlice, {
	burgerConstructorActions,
} from './burger-сonstructor-slice';
import ingredientDetailsSlice, {
	ingredientDetailsActions,
} from './ingredient-details-slice';
import orderDetailsSlice from './order-details-slice';
import userSlice from './user-slice';
import { WebsocketStatus } from '../../types/websocket';
import { socketMiddleware } from '../middleware/socketMiddleware';
import ordersSlice, { webSocketActions, wsActions } from './websocket-slice';

export const rootReducer = combineSlices(
	burgerIngredientsSlice,
	burgerConstructorSlice,
	ingredientDetailsSlice,
	orderDetailsSlice,
	userSlice,
	ordersSlice
);

const preloadedState = {
	burgerIngredients: { data: null, isLoading: false, isError: false },
	burgerConstructor: { bun: null, ingredients: [] },
	ingredientDetails: { data: null },
	orderDetails: { data: null, isLoading: false, isError: false },
	user: { user: null, isAuthChecked: false },
	webSocket: {
		status: WebsocketStatus.OFFLINE,
		orders: [],
		total: 0,
		totalToday: 0,
		error: '',
	},
};

const wsUrl = 'wss://norma.nomoreparties.space/';

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(socketMiddleware(wsUrl, wsActions)),
	devTools: process.env.NODE_ENV !== 'production',
	preloadedState,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppActions =
	| burgerConstructorActions
	| ingredientDetailsActions
	| orderDetailsActions
	| webSocketActions;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
