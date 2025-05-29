import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import bun from '../../images/bun.png';
import styles from './order-card.module.scss';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import { Link, useLocation } from 'react-router-dom';

type TOrderCard = {
	num: number;
	dateFromServer: string;
	status: string;
	price: number;
	img?: string;
};

const OrderCard = ({
	num,
	dateFromServer,
	status,
	price,
	img = bun,
}: TOrderCard) => {
	const ingredients = [bun, bun, bun, bun, bun, bun];
	const location = useLocation();
	console.log(location);

	return (
		<Link to={`${location.pathname}/${num}`} state={{ background: location }}>
			<div className={`${styles.card} p-6 mb-4 mr-2`}>
				<div className={`${styles.info} mb-6`}>
					<p className='text text_type_digits-default'>{`#${num}`}</p>
					<FormattedDate
						className='text text_type_main-default text_color_inactive'
						date={new Date(dateFromServer)}
					/>
				</div>
				<h3 className='text text_type_main-medium mb-2'>
					Death Star Starship Main бургер
				</h3>
				<p className='text text_type_main-default mb-6'>{status}</p>
				<div className={`${styles.ingredientsBlock}`}>
					<div className={`${styles.ingredients}`}>
						{ingredients.map((item, index) => (
							<IngredientIcon img={bun} index={index} />
						))}
					</div>
					<div className={`${styles.currencyBlock} p-2`}>
						<span className='text text_type_digits-default mr-2'>{price}</span>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</div>
		</Link>
	);
};

export default OrderCard;
