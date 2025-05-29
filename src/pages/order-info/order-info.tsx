import styles from './order-info.module.scss';
import bun from '../../images/bun.png';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientIcon from '../../components/ingredient-icon/ingredient-icon';

const OrderInfo = () => {
	const orderNumber = 134533;
	const dateFromServer = 'Вчера, 13:50';
	const price = 423;
	const amount = 1;

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<p className='text text_type_digits-default'>{`#${orderNumber}`}</p>
				<p className='text text_type_main-medium mt-10 mb-3'>
					Black Hole Singularity острый бургер
				</p>
				<p className={`text text_type_main-small mb-15 ${styles.ready}`}>
					Выполнен
				</p>
				<p className='text text_type_main-medium mt-10 mb-6'>Состав:</p>
				<div className={`${styles.ingredientsBlock} mb-10 pr-6`}>
					<div className={styles.card}>
						<IngredientIcon img={bun} />
						<p className={`text text_type_main-small mr-4 ml-4 ${styles.name}`}>
							Флюоресцентная булка R2-D3
						</p>
						<div className={`${styles.currencyBlock} p-2`}>
							<span className='text text_type_digits-default mr-2'>
								{amount}
							</span>
							<span className='text text_type_main-small mr-2'>х</span>
							<span className='text text_type_digits-default mr-2'>{23}</span>
							<CurrencyIcon type='primary' />
						</div>
					</div>
				</div>
				<div className={`${styles.infoBlock} mb-4`}>
					<FormattedDate
						className='text text_type_main-default text_color_inactive'
						date={new Date(dateFromServer)}
					/>
					<div className={`${styles.currencyBlock} p-2`}>
						<span className='text text_type_digits-default mr-2'>{price}</span>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderInfo;
