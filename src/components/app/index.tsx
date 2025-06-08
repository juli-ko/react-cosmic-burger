import {
	Routes,
	Route,
	useNavigate,
	useLocation,
	Navigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import { Home } from '../../pages/home/Home';
import Modal from '../modal/modal';
import styles from './app.module.scss';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { Login } from '../../pages/auth-pages/Login';
import { Register } from '../../pages/auth-pages/Register';
import { ForgotPassword } from '../../pages/auth-pages/ForgotPassword';
import { ResetPassword } from '../../pages/auth-pages/ResetPassword';
import { checkUserAuth } from '../../services/userSlice';
import { OnlyAuth, OnlyUnAuth } from './protected-route';
import { Profile } from '../../pages/profile/Profile';
import { ProfileUser } from '../../pages/profile/ProfileUser';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { ProfileOrders } from '../../pages/profile/ProfileOrders';
import { Feed } from '../../pages/feed/Feed';
import OrderInfo from '../../pages/order-info/order-info';
import { loadIngredients } from '../../services/ingredientsSlice';

export const App = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const background = location.state && location.state.background;

	const handleModalClose = () => navigate(-1);

	useEffect(() => {
		dispatch(checkUserAuth());
		dispatch(loadIngredients());
	}, []);

	return (
		<div className={styles.page}>
			<AppHeader />
			<Routes location={background || location}>
				<Route path='/' element={<Home />} />
				<Route path='/feed' element={<Feed />} />
				<Route path='/feed/:id' element={<OrderInfo />} />
				<Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
				<Route
					path='/register'
					element={<OnlyUnAuth component={<Register />} />}
				/>
				<Route
					path='/forgot-password'
					element={<OnlyUnAuth component={<ForgotPassword />} />}
				/>
				<Route
					path='/reset-password'
					element={<OnlyUnAuth component={<ResetPassword />} />}
				/>
				<Route path='/profile' element={<OnlyAuth component={<Profile />} />}>
					<Route index element={<ProfileUser />} />
					<Route path='orders' element={<ProfileOrders />} />
				</Route>
				<Route path='/profile/orders/:id' element={<OrderInfo />} />
				<Route
					path='/ingredients/:ingredientId'
					element={<IngredientDetails />}
				/>
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>

			{background && (
				<Routes>
					<Route
						path='/ingredients/:ingredientId'
						element={
							<Modal onClose={handleModalClose}>
								<IngredientDetails />
							</Modal>
						}
					/>
					<Route
						path='/profile/orders/:id'
						element={
							<Modal onClose={handleModalClose}>
								<OrderInfo />
							</Modal>
						}
					/>
					<Route
						path='/feed/:id'
						element={
							<Modal onClose={handleModalClose}>
								<OrderInfo />
							</Modal>
						}
					/>
				</Routes>
			)}
		</div>
	);
};
