import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {
	getIngredientsData,
	getIngredientsError,
	getIngredientsLoading,
	loadIngredients,
} from '../../services/ingredientsSlice';
import styles from './app.module.scss';

export const App = () => {
	const dispatch = useDispatch();
	const loading = useSelector(getIngredientsLoading);
	const hasError = useSelector(getIngredientsError);
	const data = useSelector(getIngredientsData);

	useEffect(() => {
		dispatch(loadIngredients());
	}, []);

	return (
		<div className={styles.page}>
			<AppHeader />
			<main className={styles.main}>
				{hasError && (
					<p className='text text_type_main-default'>
						Ошибка при загрузке данных...
					</p>
				)}
				{loading && data.length <= 0 && (
					<p className='text text_type_main-default'>Загрузка...</p>
				)}
				{!loading && !hasError && (
					<>
						<BurgerIngredients />
						<BurgerConstructor />
					</>
				)}
			</main>
		</div>
	);
};
