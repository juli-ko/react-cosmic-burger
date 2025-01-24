import styles from './app.module.scss';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

export const App = () => {
	return (
		<div className={styles.page}>
			<AppHeader />
			<main className={styles.main}>
				<BurgerIngredients></BurgerIngredients>
			</main>
		</div>
	);
};
