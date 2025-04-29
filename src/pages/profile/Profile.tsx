import { NavLink, Outlet, useMatch, useNavigate } from 'react-router-dom';
import styles from './Profile.module.scss';
import { logout } from '../../services/userSlice';
import { useDispatch } from 'react-redux';

export const Profile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isProfile = useMatch('/profile');
	const isOrdersHistory = useMatch('/profile/orders');

	const onExit = async () => {
		//@ts-expect-error "services"
		await dispatch(logout());
		navigate('/login');
	};

	return (
		<div className={styles.profilePage}>
			<nav
				className={`text text_type_main-medium ${styles.navigation} mt-30 mr-15 mb-20`}>
				<NavLink
					to='/profile'
					end
					className={({ isActive }) =>
						`${styles.link} ${
							!isActive ? 'text_color_inactive' : styles.activeLink
						}`
					}>
					<p>Профиль</p>
				</NavLink>
				<NavLink
					to='/profile/orders'
					className={({ isActive }) =>
						`${styles.link} ${
							!isActive ? 'text_color_inactive' : styles.activeLink
						}`
					}>
					<p>История заказов</p>
				</NavLink>
				<button
					onClick={onExit}
					className={`${styles.link} text text_type_main-medium text_color_inactive`}>
					<p>Выход</p>
				</button>

				<p className='text_type_main-default mt-20 text_color_inactive'>
					{isProfile && (
						<>
							В этом разделе вы можете
							<br />
							изменить свои персональные данные
						</>
					)}
					{isOrdersHistory && (
						<>
							В этом разделе вы можете
							<br />
							посмотреть свою историю заказов
						</>
					)}
				</p>
			</nav>

			<Outlet />
		</div>
	);
};
