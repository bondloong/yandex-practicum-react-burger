import { combineSlices, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import burgerIngredientsSlice from './burger-ingredients-slice';
import burgerConstructorSlice, {
	burgerConstructorActions,
} from './burger-сonstructor-slice';
import ingredientDetailsSlice, {
	ingredientDetailsActions,
} from './ingredient-details-slice';
import orderDetailsSlice, { orderDetailsActions } from './order-details-slice';
import userSlice from './user-slice';
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

const wsUrl = 'wss://norma.nomoreparties.space/';

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(socketMiddleware(wsUrl, wsActions)),
	devTools: process.env.NODE_ENV !== 'production',
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
