import React, { useState } from 'react';
import IngredientGroup from './ingredient-group/ingredient-group';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.scss';

const TYPES = [
	{ name: 'Булки', value: 'bun' },
	{ name: 'Соусы', value: 'sauce' },
	{ name: 'Начинки', value: 'main' },
];

const BurgerIngredients = ({ data }) => {
	const [currentType, setCurrentType] = React.useState(0);
	const [selectedIngredient, setSelectedIngredient] = useState(null);

	const openModal = (ingredient) => {
		setSelectedIngredient(ingredient);
	};

	const closeModal = () => {
		setSelectedIngredient(null);
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
						onClick={openModal}
					/>
				))}
			</div>

			{selectedIngredient && (
				<>
					<ModalOverlay onClose={closeModal} />
					<Modal header='Детали ингредиента' onClose={closeModal}></Modal>
				</>
			)}
		</section>
	);
};

export default BurgerIngredients;
