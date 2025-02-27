import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../prop-types/prop-types';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { decrementCounter } from '../../services/ingredientsSlice';
import {
	removeItemFromConstructor,
	moveItem,
} from '../../services/constructorSlice';
import styles from './burger-constructor.module.scss';

const DragIngredient = ({ itemData, index }) => {
	const dispatch = useDispatch();
	const ref = useRef(null);

	const [{ opacity }, drag] = useDrag({
		type: 'item',
		item: { ...itemData, index },
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0 : 1,
		}),
	});

	const [, drop] = useDrop({
		accept: 'item',
		hover(item, monitor) {
			if (!ref.current) return;

			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) return;

			dispatch(moveItem({ dragIndex, hoverIndex }));
			item.index = hoverIndex;
		},
	});

	const handleRemove = (item) => {
		dispatch(removeItemFromConstructor(item));
		dispatch(decrementCounter(item._id));
	};

	drag(drop(ref));

	return (
		<div className={styles.ingredient} ref={ref} style={{ opacity }}>
			<DragIcon type='primary' />
			<ConstructorElement
				text={itemData.name}
				price={itemData.price}
				thumbnail={itemData.image}
				handleClose={() => handleRemove(itemData)}
			/>
		</div>
	);
};

export default DragIngredient;

DragIngredient.propTypes = {
	itemData: ingredientPropType,
	index: PropTypes.number.isRequired,
};
