import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import { Home } from '../../pages/home/Home';
import Modal from '../modal/modal';
import styles from './app.module.scss';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { Login } from '../../pages/auth-pages/Login';
import { Register } from '../../pages/auth-pages/Register';
import { ForgotPassword } from '../../pages/auth-pages/ForgotPassword';
import { ResetPassword } from '../../pages/auth-pages/ResetPassword';

export const App = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const background = location.state && location.state.background;

	const handleModalClose = () => navigate(-1);
	console.log(background);

	return (
		<div className={styles.page}>
			<AppHeader />
			<Routes location={background || location}>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
				<Route path='/reset-password' element={<ResetPassword />} />
				<Route
					path='/ingredients/:ingredientId'
					element={<IngredientDetails />}
				/>
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
				</Routes>
			)}
		</div>
	);
};
