import styles from './order-details.module.scss';
import done from '../../images/done.svg';
import loader from '../../images/loader.svg';
import { useSelector } from 'react-redux';
import {
	getOrderNumber,
	getOrderLoading,
	getOrderError,
} from '../../services/orderDetailsSlice';

type TOrderDetails = {
	ingredientsError: boolean;
};

const OrderDetails = ({ ingredientsError }: TOrderDetails) => {
	const orderNumber = useSelector(getOrderNumber);
	const loading = useSelector(getOrderLoading);
	const hasError = useSelector(getOrderError);

	if (ingredientsError) {
		return (
			<div className={styles.container}>
				<p className='text text_type_main-medium'>Ошибка!</p>
				<p className='text text_type_main-default mt-5'>
					Добавте ингредиенты и булочку для оформления заказа
				</p>
			</div>
		);
	}

	return (
		<div className={styles.container} data-testid='order-modal'>
			{hasError && (
				<>
					<p className='text text_type_main-medium'>Ошибка!</p>
					<p className='text text_type_main-default mt-5'>
						Неизвестная ошибка при оформлении заказа
					</p>
				</>
			)}

			{loading && !hasError && (
				<>
					<p className='text text_type_main-medium'>...формируем заказ</p>
					<img src={loader} alt='loader' />
				</>
			)}

			{!hasError && !loading && (
				<>
					<p className='text text_type_digits-large'>{orderNumber}</p>
					<p className='text text_type_main-medium mt-8'>
						идентификатор заказа
					</p>
					<img src={done} alt={'done'} className='m-15' />
					<p className='text text_type_main-default mb-2'>
						Ваш заказ начали готовить
					</p>
					<p className='text text_type_main-default text_color_inactive mb-30'>
						Дождитесь готовности на орбитальной станции
					</p>
				</>
			)}
		</div>
	);
};

export default OrderDetails;
