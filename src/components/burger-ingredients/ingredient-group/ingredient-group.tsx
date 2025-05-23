import styles from './ingredient-group.module.scss';
import IngredientItem from '../ingredient-item/ingredient-item';
import { TData } from '../../../utils/types';

type TIngredientItem = {
	typeName: string;
	data: TData;
};

const IngredientGroup = ({ typeName, data }: TIngredientItem) => {
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
