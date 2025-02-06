import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useDrag } from 'react-dnd';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../../prop-types/prop-types';
import { addToDetails } from '../../../services/ingredientDetailsSlice';
import styles from './ingredient-item.module.scss';

const IngredientItem = ({ itemData }) => {
	const dispatch = useDispatch();
	const [count, setcount] = useState(0);
	const openModal = (data) => {
		setcount((prev) => (prev += 1));
		dispatch(addToDetails(data));
	};

	const [{ opacity }, dragRef] = useDrag({
		type: itemData.type === 'bun' ? 'bun' : 'ingredient',
		item: { ...itemData },
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0 : 1,
		}),
	});

	return (
		<div
			ref={dragRef}
			className={styles.ingredient}
			style={{ opacity }}
			onClick={() => openModal(itemData)}>
			{count > 0 && <Counter count={count} size='default' extraClass='m-1' />}
			<img src={itemData.image} alt={itemData.name} />
			<div className={`${styles.currencyBlock} p-2`}>
				<span className='text text_type_digits-default mr-2'>
					{itemData.price}
				</span>
				<CurrencyIcon type='primary' />
			</div>
			<h3 className='text text_type_main-default'>{itemData.name}</h3>
		</div>
	);
};

export default IngredientItem;

IngredientItem.propTypes = {
	itemData: ingredientPropType.isRequired,
};
