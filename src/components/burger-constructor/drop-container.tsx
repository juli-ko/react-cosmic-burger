import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { incrementCounter } from '../../services/ingredientsSlice';
import {
	getConstructorBun,
	getConstructorIngredients,
	addToConstructor,
} from '../../services/constructorSlice';
import Skeleton from './skeleton';
import DragIngredient, { TDragObject } from './drag-ingredient';
import styles from './burger-constructor.module.scss';
import { TIngredient } from '../../utils/types';

type TDropContainer = {
	type: 'bun' | 'ingredient';
	position?: 'top' | 'bottom';
};

type TDropCollectedProps = {
	isHover: boolean;
};

const DropContainer = ({ type, position }: TDropContainer) => {
	const dispatch = useDispatch();
	const ingredients = useSelector(getConstructorIngredients);
	const bun = useSelector(getConstructorBun);

	const [{ isHover }, dropRef] = useDrop<
		TDragObject,
		unknown,
		TDropCollectedProps
	>({
		accept: type,
		drop(item) {
			onDropHandler(item);
		},
		collect: (monitor) => ({
			isHover: monitor.isOver(),
		}),
	});

	const onDropHandler = (item: TIngredient) => {
		dispatch(addToConstructor(item));
		dispatch(incrementCounter(item._id));
	};

	const borderColor = isHover ? 'lightgreen' : 'transparent';

	return (
		<div
			ref={dropRef}
			className={`${styles.ingredient} ${type === 'bun' && 'mb-4 mr-4 ml-5'}`}>
			{type === 'bun' &&
				(bun ? (
					<ConstructorElement
						type={position}
						isLocked={true}
						text={`${bun.name} ${position === 'top' ? '(верх)' : '(низ)'}`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				) : (
					<Skeleton
						text='Выберите булку'
						position={position}
						borderColor={borderColor}
					/>
				))}
			{type === 'ingredient' && (
				<div
					className={`${styles.ingredientsScroll} mb-4 p-2`}
					data-testid='drop-element'>
					{ingredients.length <= 0 && (
						<Skeleton
							text='Выберите начинку и соус'
							borderColor={borderColor}
						/>
					)}
					{ingredients.map((item, index) => (
						<DragIngredient key={item.key} itemData={item} index={index} />
					))}
				</div>
			)}
		</div>
	);
};

export default DropContainer;
