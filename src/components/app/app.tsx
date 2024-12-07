import AppHeader from '../app-header/app-header';
import { useAppDispatch } from '../../services/slices';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { checkUserAuth } from '../../services/slices/user-slice';
import {
	ForgotPasswordPage,
	IngredientPage,
	LoginPage,
	MainPage,
	NotFound404,
	OrdersPage,
	ProfilePage,
	RegisterPage,
	ResetPasswordPage,
} from '../../pages';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import {
	RouteOnlyAuth,
	RouteOnlyUnAuth,
} from '../protected-route-element/protected-route-element';

function App() {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(checkUserAuth());
	}, [dispatch]);

	return (
		<>
			<AppHeader />
			<Routes location={location.state?.backgroundLocation || location}>
				<Route path='/' element={<MainPage />} />
				<Route
					path='/login'
					element={<RouteOnlyUnAuth component={<LoginPage />} />}
				/>
				<Route
					path='/register'
					element={<RouteOnlyUnAuth component={<RegisterPage />} />}
				/>
				<Route
					path='/forgot-password'
					element={<RouteOnlyUnAuth component={<ForgotPasswordPage />} />}
				/>
				<Route
					path='/reset-password'
					element={<RouteOnlyUnAuth component={<ResetPasswordPage />} />}
				/>
				<Route
					path='/profile'
					element={<RouteOnlyAuth component={<ProfilePage />} />}>
					<Route
						path='orders'
						element={<RouteOnlyAuth component={<OrdersPage />} />}
					/>
				</Route>
				<Route path='/ingredients/:id' element={<IngredientPage />} />
				<Route path='*' element={<NotFound404 />} />
			</Routes>

			{location.state?.backgroundLocation && (
				<Routes>
					<Route
						path='/ingredients/:id'
						element={
							<Modal onClose={() => navigate('/', { replace: true })}>
								<IngredientDetails />
							</Modal>
						}
					/>
					<Route
						path='/'
						element={
							<Modal onClose={() => navigate('/', { replace: true })}>
								<OrderDetails />
							</Modal>
						}
					/>
				</Routes>
			)}
		</>
	);
}

export default App;
