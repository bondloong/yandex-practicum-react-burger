// store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import burgerIngredientsSlice from './burger-ingredients-slice';
import burgerConstructorSlice from './burger-сonstructor-slice';
import ingredientDetailsSlice from './ingredient-details-slice';
import orderDetailsSlice from './order-details-slice';
import userSlice from './user-slice';

const rootReducer = combineReducers({
	burgerIngredients: burgerIngredientsSlice.reducer,
	burgerConstructor: burgerConstructorSlice.reducer,
	ingredientDetails: ingredientDetailsSlice.reducer,
	orderDetails: orderDetailsSlice.reducer,
	user: userSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const preloadedState: RootState = {
	burgerIngredients: { data: null, isLoading: false, isError: false },
	burgerConstructor: { bun: null, ingredients: [] },
	ingredientDetails: { data: null },
	orderDetails: { data: null, isLoading: false, isError: false },
	user: { user: null, isAuthChecked: false },
};

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
	devTools: process.env.NODE_ENV !== 'production',
	preloadedState,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
