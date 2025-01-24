import React from 'react';

import IngredientGroup from './ingredient-group/ingredient-group';
import styles from './burger-ingredients.module.scss';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients = ({ data }) => {
	const [currentType, setCurrentType] = React.useState(0);
	const types = [
		{ name: 'Булки', value: 'bun' },
		{ name: 'Соусы', value: 'sauce' },
		{ name: 'Начинки', value: 'main' },
	];

	return (
		<section className={`${styles.ingredientsWrapper} mr-5 ml-5`}>
			<h1 className='text text_type_main-large mb-5 mt-10'>Соберите бургер</h1>
			<div className={`${styles.typesToggle} mb-10`}>
				{types.map((type, index) => (
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
				{types.map((type) => (
					<IngredientGroup
						key={type.value}
						typeName={type.name}
						data={data.filter((item) => item.type === type.value)}
					/>
				))}
			</div>
		</section>
	);
};

export default BurgerIngredients;
