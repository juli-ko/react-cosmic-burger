import styles from './ingredient-icon.module.scss';

type TIngredientIcon = {
	img: string;
	index?: number;
	rest?: number;
};

const IngredientIcon = ({ img, index = 6, rest = 0 }: TIngredientIcon) => {
	return (
		<div
			className={`${styles.ingredientBorder}  ${styles[`zIndex${7 - index}`]}`}>
			<div className={`${styles.ingredientBackground}`}>
				{index === 4 && rest > 0 ? (
					<>
						<img src={`${img}`} alt='ingredient' style={{ opacity: 0.6 }} />
						<p
							className={`text text_type_digits-default ${styles.rest}`}>{`+${rest}`}</p>
					</>
				) : (
					<img src={`${img}`} alt='ingredient' />
				)}
			</div>
		</div>
	);
};

export default IngredientIcon;
