import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
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
import { TIngredient } from '../../utils/types';

type TDragIngredient = {
	itemData: TIngredient;
	index: number;
};

export type TDragObject = TIngredient & {
	index: number;
};

type TDragCollectedProps = {
	opacity: number;
};

const DragIngredient = ({ itemData, index }: TDragIngredient) => {
	const dispatch = useDispatch();
	const ref = useRef(null);

	const [{ opacity }, drag] = useDrag<
		TDragObject,
		unknown,
		TDragCollectedProps
	>({
		type: 'item',
		item: { ...itemData, index },
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0 : 1,
		}),
	});

	const [, drop] = useDrop<TDragObject, unknown, {}>({
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

	const handleRemove = (item: TIngredient) => {
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
