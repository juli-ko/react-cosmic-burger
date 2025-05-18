import styles from './ingredient-icon.module.scss';

type TIngredientIcon = {
	img: string;
	index?: number;
};

const IngredientIcon = ({ img, index = 6 }: TIngredientIcon) => {
	return (
		<div
			className={`${styles.ingredientBorder}  ${styles[`zIndex${7 - index}`]}`}>
			<div className={`${styles.ingredientBackground}`}>
				<img src={`${img}`} alt='ingredient' />
			</div>
		</div>
	);
};

export default IngredientIcon;
