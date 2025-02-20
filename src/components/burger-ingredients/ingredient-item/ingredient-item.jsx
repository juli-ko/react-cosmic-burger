import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../../prop-types/prop-types';

import styles from './ingredient-item.module.scss';

const IngredientItem = ({ itemData, onClick }) => {
	return (
		<div className={styles.ingredient} onClick={() => onClick(itemData)}>
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
	onClick: PropTypes.func.isRequired,
};
