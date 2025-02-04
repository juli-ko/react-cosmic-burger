import styles from './order-details.module.scss';
import done from '../../images/done.svg';
import { useSelector } from 'react-redux';
import {
	getOrderNumber,
	getOrderLoading,
	getOrderError,
} from '../../services/orderDetailsSlice';

const OrderDetails = () => {
	const orderNumber = useSelector(getOrderNumber);
	const loading = useSelector(getOrderLoading);
	const hasError = useSelector(getOrderError);

	return (
		<div className={styles.container}>
			{loading && !hasError && (
				<p className='text text_type_main-medium'>...формируем заказ</p>
			)}
			{hasError ? (
				<>
					<p className='text text_type_main-medium'>Ошибка! </p>
					<p className='text text_type_main-default mt-5'>
						Нужно добавить ингредиенты в конструктор
					</p>
				</>
			) : (
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
