import { ingredientPropType } from '../../prop-types/prop-types';
import styles from './ingredient-details.module.scss';

const IngredientDetails = ({ itemData }) => {
	return (
		<div className={styles.container}>
			<img src={itemData.image_large} alt={itemData.name} />
			<p className='text text_type_main-medium mt-4 mb-8'>{itemData.name}</p>
			<ul
				className={`${styles.info} text text_type_main-default text_color_inactive mb-15`}>
				<li className='mr-5'>
					<p>Калории,ккал</p>
					<p className='text_type_digits-default pt-2'>{itemData.calories}</p>
				</li>
				<li className='mr-5'>
					<p>Белки, г</p>
					<p className='text_type_digits-default pt-2'>{itemData.proteins}</p>
				</li>
				<li className='mr-5'>
					<p>Жиры, г</p>
					<p className='text_type_digits-default pt-2'>{itemData.fat}</p>
				</li>
				<li>
					<p>Углеводы, г</p>
					<p className='text_type_digits-default pt-2'>
						{itemData.carbohydrates}
					</p>
				</li>
			</ul>
		</div>
	);
};

export default IngredientDetails;

IngredientDetails.propTypes = ingredientPropType.isRequired;
