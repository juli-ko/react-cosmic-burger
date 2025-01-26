import styles from './order-details.module.scss';
import done from '../../images/done.svg';

const OrderDetails = ({ orderNumber }) => {
	return (
		<div className={styles.container}>
			<p className='text text_type_digits-large'>{orderNumber}</p>
			<p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
			<img src={done} alt={'done'} className='m-15' />
			<p className='text text_type_main-default mb-2'>
				Ваш заказ начали готовить
			</p>
			<p className='text text_type_main-default text_color_inactive mb-30'>
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
};

export default OrderDetails;
