import React, { useRef, useEffect } from 'react';
import IngredientGroup from './ingredient-group/ingredient-group';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.scss';
import { getIngredientsData } from '../../services/ingredientsSlice';
import { useSelector } from 'react-redux';

const TYPES = [
	{ name: 'Булки', value: 'bun' },
	{ name: 'Соусы', value: 'sauce' },
	{ name: 'Начинки', value: 'main' },
];

const BurgerIngredients = () => {
	const data = useSelector(getIngredientsData);

	const [currentType, setCurrentType] = React.useState(0);
	const ingredientsGroupsRefs = useRef([]);
	const scrollContainerRef = useRef(null);

	const handleScroll = () => {
		const scrollContainerTop =
			scrollContainerRef.current.getBoundingClientRect().top;
		const distances = ingredientsGroupsRefs.current.map((ref) =>
			Math.abs(ref.current.getBoundingClientRect().top - scrollContainerTop)
		);
		const closestIndex = distances.indexOf(Math.min(...distances));
		setCurrentType(closestIndex);
	};

	useEffect(() => {
		const container = scrollContainerRef.current;
		container.addEventListener('scroll', handleScroll);

		return () => {
			container.removeEventListener('scroll', handleScroll);
		};
	}, []);

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
			<div className={styles.groupsBlock} ref={scrollContainerRef}>
				{TYPES.map((type, index) => (
					<div
						key={index}
						ref={(el) =>
							(ingredientsGroupsRefs.current[index] = { current: el })
						}>
						<IngredientGroup
							key={type.value}
							typeName={type.name}
							data={data.filter((item) => item.type === type.value)}
						/>
					</div>
				))}
			</div>
		</section>
	);
};

export default BurgerIngredients;
