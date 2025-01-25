import styles from './app.module.scss';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useState, useEffect } from 'react';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const App = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		const getIngredients = async () => {
			try {
				const response = await fetch(API_URL);
				if (!response.ok) {
					throw new Error('Ошибка при получении данных');
				}
				const result = await response.json();
				setData(result.data);
			} catch (error) {
				setHasError(true);
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		getIngredients();
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
				{isLoading && data.length <= 0 && (
					<p className='text text_type_main-default'>Загрузка...</p>
				)}
				{!isLoading && !hasError && data.length > 0 && (
					<>
						<BurgerIngredients data={data} />
						<BurgerConstructor data={data} />
					</>
				)}
			</main>
		</div>
	);
};
