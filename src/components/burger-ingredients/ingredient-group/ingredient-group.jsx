import styles from './ingredient-group.module.scss';
import IngredientItem from '../ingredient-item/ingredient-item';
import { dataPropType } from '../../../prop-types/prop-types';
import PropTypes from 'prop-types';

const IngredientGroup = ({ typeName, data }) => {
	return (
		<section className={`${styles.group} mb-10`}>
			<h2 className='text text_type_main-medium'>{typeName}</h2>
			<div className={styles.ingredients}>
				{data.map((item) => (
					<IngredientItem key={item._id} itemData={item} />
				))}
			</div>
		</section>
	);
};
export default IngredientGroup;

IngredientGroup.propTypes = {
	typeName: PropTypes.string.isRequired,
	data: dataPropType.isRequired,
};
