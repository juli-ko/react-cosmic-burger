import React from 'react';
import IngredientGroup from './ingredient-group/ingredient-group';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.scss';
import { dataPropType } from '../../prop-types/prop-types';
import { getIngredientsData } from '../../services/ingredientsSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
	addToDetails,
	getItemData,
	removeFromDetails,
} from '../../services/ingredientDetailsSlice';

const TYPES = [
	{ name: 'Булки', value: 'bun' },
	{ name: 'Соусы', value: 'sauce' },
	{ name: 'Начинки', value: 'main' },
];

const BurgerIngredients = () => {
	const dispatch = useDispatch();
	const data = useSelector(getIngredientsData);
	const selectedIngredient = useSelector(getItemData);
	const [currentType, setCurrentType] = React.useState(0);

	const closeModal = () => {
		dispatch(removeFromDetails());
	};

	return (
		<section className={`${styles.ingredientsWrapper} mr-5 ml-5`}>
			<h1 className='text text_type_main-large mb-5 mt-10'>Соберите бургер</h1>
			<div className={`${styles.typesToggle} mb-10`}>
				{TYPES.map((type, index) => (
					<Tab
						key={type.value}
						value={type.value}
						active={currentType === index}
						onClick={() => setCurrentType(index)}>
						{type.name}
					</Tab>
				))}
			</div>
			<div className={styles.groupsBlock}>
				{TYPES.map((type) => (
					<IngredientGroup
						key={type.value}
						typeName={type.name}
						data={data.filter((item) => item.type === type.value)}
					/>
				))}
			</div>

			{selectedIngredient && (
				<Modal header='Детали ингредиента' onClose={closeModal}>
					<IngredientDetails></IngredientDetails>
				</Modal>
			)}
		</section>
	);
};

export default BurgerIngredients;

BurgerIngredients.propTypes = dataPropType.isRequired;
