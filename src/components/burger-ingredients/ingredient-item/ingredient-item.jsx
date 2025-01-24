import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredient-item.module.scss';

const IngredientItem = ({ itemData }) => {
	return (
		<div className={styles.ingredient}>
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
