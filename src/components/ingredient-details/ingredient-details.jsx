import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
	loadIngredients,
	getIngredientsData,
} from '../../services/ingredientsSlice';
import styles from './ingredient-details.module.scss';

const IngredientDetails = () => {
	const { ingredientId } = useParams();
	const dispatch = useDispatch();
	const ingredients = useSelector(getIngredientsData);
	const itemData = ingredients.find((item) => item._id === ingredientId);

	useEffect(() => {
		if (!ingredients.length) {
			dispatch(loadIngredients());
		}
	}, [dispatch, ingredients]);

	if (!itemData) {
		return (
			<div className={styles.container}>
				<p className='text text_type_main-medium'>
					Загрузка данных об ингредиенте...
				</p>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<img src={itemData.image_large} alt={itemData.name} />
			<p className='text text_type_main-medium mt-4 mb-8'>{itemData.name}</p>
			<ul
				className={`${styles.info} text text_type_main-default text_color_inactive mb-15`}>
				<li className='mr-5'>
					<p>Калории,ккал</p>
					<p className='text_type_digits-default pt-2'>{itemData.calories}</p>
				</li>
				<li className='mr-5'>
					<p>Белки, г</p>
					<p className='text_type_digits-default pt-2'>{itemData.proteins}</p>
				</li>
				<li className='mr-5'>
					<p>Жиры, г</p>
					<p className='text_type_digits-default pt-2'>{itemData.fat}</p>
				</li>
				<li>
					<p>Углеводы, г</p>
					<p className='text_type_digits-default pt-2'>
						{itemData.carbohydrates}
					</p>
				</li>
			</ul>
		</div>
	);
};

export default IngredientDetails;
