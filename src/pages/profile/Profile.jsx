import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './Profile.module.scss';
import { login } from '../../services/userSlice';

export const Profile = () => {
	return (
		<div className={styles.profilePage}>
			<nav
				className={`text text_type_main-medium ${styles.navigation} mt-30 mr-15 mb-20`}>
				<NavLink
					to='/profile'
					className={({ isActive }) =>
						`${styles.link} ${
							!isActive ? 'text_color_inactive' : styles.activeLink
						}`
					}>
					Профиль
				</NavLink>
				<NavLink
					to='/profile/orders'
					className={({ isActive }) =>
						`${styles.link} ${
							!isActive ? 'text_color_inactive' : styles.activeLink
						}`
					}>
					История заказов
				</NavLink>
				<NavLink
					to='/login'
					className={({ isActive }) =>
						`${styles.link} ${
							!isActive ? 'text_color_inactive' : styles.activeLink
						}`
					}>
					Выход
				</NavLink>

				<p className='text_type_main-default mt-20 text_color_inactive'>
					В этом разделе вы можете
					<br /> изменить свои персональные данные
				</p>
			</nav>

			<Outlet />
		</div>
	);
};
