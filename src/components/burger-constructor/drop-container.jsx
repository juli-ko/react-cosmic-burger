import { useDrop, useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
	incrementCounter,
	decrementCounter,
} from '../../services/ingredientsSlice';
import {
	getConstructorBun,
	getConstructorIngredients,
	removeItemFromConstructor,
	addToConstructor,
} from '../../services/constructorSlice';
import Skeleton from './skeleton';
import styles from './burger-constructor.module.scss';

const DropContainer = ({ type, position = '' }) => {
	const dispatch = useDispatch();
	const ingredients = useSelector(getConstructorIngredients);
	const bun = useSelector(getConstructorBun);

	const [{ isHover }, dropRef] = useDrop({
		accept: type,
		drop(item) {
			onDropHandler(item);
		},
		collect: (monitor) => ({
			isHover: monitor.isOver(),
		}),
	});

	// const [{ opacity }, dragInsideConstructorRef] = useDrag({
	// 	type: 'item',
	// 	item: { ...item },
	// 	collect: (monitor) => ({
	// 		opacity: monitor.isDragging() ? 0 : 1,
	// 	}),
	// });

	const onDropHandler = (item) => {
		dispatch(addToConstructor(item));
		dispatch(incrementCounter(item._id));
	};

	const handleRemove = (item) => {
		dispatch(removeItemFromConstructor(item));
		dispatch(decrementCounter(item._id));
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
				<div className={`${styles.ingredientsScroll} mb-4 p-2`}>
					{ingredients.length <= 0 && (
						<Skeleton
							text='Выберите начинку и соус'
							borderColor={borderColor}
						/>
					)}
					{ingredients.map((item) => (
						<div className={styles.ingredient} key={item.key}>
							<DragIcon type='primary' />
							<ConstructorElement
								text={item.name}
								price={item.price}
								thumbnail={item.image}
								handleClose={() => handleRemove(item)}
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default DropContainer;
