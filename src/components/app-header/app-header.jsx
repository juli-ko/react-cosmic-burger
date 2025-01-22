import styles from './app-header.module.scss';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
	return (
		<header className={styles.header}>
			<nav className={`${styles.navigation} text text_type_main-default m-4`}>
				<ul className={styles.ul}>
					<li className={`${styles.li} mr-2`}>
						<BurgerIcon type='primary' />
						<span className='pl-2'>Конструктор</span>
					</li>
					<li className={styles.li}>
						<ListIcon type='secondary' />
						<span className='pl-2 text_color_inactive'>Лента заказов</span>
					</li>
				</ul>
				<ul className={styles.ul}>
					<li className={styles.li}>
						<ProfileIcon type='secondary' />
						<span className='pl-2 text_color_inactive'>Личный кабинет</span>
					</li>
				</ul>
			</nav>
			<Logo className={styles.logo} />
		</header>
	);
};

export default AppHeader;
