import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.scss';
import { TIngredient } from '../../../utils/types';

type TIngredientItem = {
	itemData: TIngredient;
};

export type TDragCollectedProps = {
	opacity: number;
};

const IngredientItem = ({ itemData }: TIngredientItem) => {
	const location = useLocation();
	const count = itemData.counter;
	const ingredientId = itemData._id;

	const [{ opacity }, dragRef] = useDrag<
		TIngredient,
		unknown,
		TDragCollectedProps
	>({
		type: itemData.type === 'bun' ? 'bun' : 'ingredient',
		item: { ...itemData },
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0 : 1,
		}),
	});

	return (
		<Link
			key={ingredientId}
			to={`/ingredients/${ingredientId}`}
			state={{ background: location }}
			ref={dragRef}
			className={styles.ingredient}
			style={{ opacity }}>
			{count > 0 && <Counter count={count} size='default' extraClass='m-1' />}
			<img src={itemData.image} alt={itemData.name} />
			<div className={`${styles.currencyBlock} p-2`}>
				<span className='text text_type_digits-default mr-2'>
					{itemData.price}
				</span>
				<CurrencyIcon type='primary' />
			</div>
			<h3 className='text text_type_main-default'>{itemData.name}</h3>
		</Link>
	);
};

export default IngredientItem;
