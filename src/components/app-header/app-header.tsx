import styles from './app-header.module.scss';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

const AppHeader = () => {
	return (
		<header className={styles.header}>
			<nav className={`${styles.navigation} text text_type_main-default m-4`}>
				<ul className={styles.ul}>
					<li className={`${styles.li} mr-2`}>
						<NavLink
							to='/'
							className={({ isActive }) =>
								`${styles.link} ${
									!isActive ? 'text_color_inactive' : styles.activeLink
								}`
							}>
							{({ isActive }) => (
								<>
									<BurgerIcon type={isActive ? 'primary' : 'secondary'} />
									<span className='pl-2'>Конструктор</span>
								</>
							)}
						</NavLink>
					</li>
					<li className={styles.li}>
						<NavLink
							to='/feed'
							className={({ isActive }) =>
								`${styles.link} ${
									!isActive ? 'text_color_inactive' : styles.activeLink
								}`
							}>
							{({ isActive }) => (
								<>
									<ListIcon type={isActive ? 'primary' : 'secondary'} />
									<span className='pl-2'>Лента заказов</span>
								</>
							)}
						</NavLink>
					</li>
				</ul>
				<ul className={styles.ul}>
					<li className={styles.li}>
						<NavLink
							to='/profile'
							className={({ isActive }) =>
								`${styles.link} ${
									!isActive ? 'text_color_inactive' : styles.activeLink
								}`
							}>
							{({ isActive }) => (
								<>
									<ProfileIcon type={isActive ? 'primary' : 'secondary'} />
									<span className='pl-2'>Личный кабинет</span>
								</>
							)}
						</NavLink>
					</li>
				</ul>
			</nav>
			<Logo className={styles.logo} />
		</header>
	);
};

export default AppHeader;
