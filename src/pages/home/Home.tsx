import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import {
	getIngredientsData,
	getIngredientsError,
	getIngredientsLoading,
	loadIngredients,
} from '../../services/ingredientsSlice';
import styles from './home.module.scss';

export const Home = () => {
	const dispatch = useDispatch();
	const loading = useSelector(getIngredientsLoading);
	const hasError = useSelector(getIngredientsError);
	const data = useSelector(getIngredientsData);

	useEffect(() => {
		/* @ts-expect-error "services" */
		dispatch(loadIngredients());
	}, [dispatch]);

	if (hasError) {
		return (
			<p className='text text_type_main-default'>
				Ошибка при загрузке данных...
			</p>
		);
	}

	if (loading && data.length <= 0) {
		return <p className='text text_type_main-default'>Загрузка...</p>;
	}

	return (
		<main className={styles.main}>
			<DndProvider backend={HTML5Backend}>
				<BurgerIngredients />
				<BurgerConstructor />
			</DndProvider>
		</main>
	);
};
