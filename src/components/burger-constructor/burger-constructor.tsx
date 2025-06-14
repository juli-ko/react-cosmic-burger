import { useCallback, useState } from 'react';
import {
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import DropContainer from './drop-container';
import OrderDetails from '../order-details/order-details';
import {
	getConstructorBun,
	getConstructorIngredients,
	getConstructorIds,
	clearConstructor,
} from '../../services/constructorSlice';
import { loadOrders, removeOrderNum } from '../../services/orderDetailsSlice';
import { clearCounters } from '../../services/ingredientsSlice';
import styles from './burger-constructor.module.scss';
import { getUserInfo } from '../../services/userSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { useSelector } from 'react-redux';

const BurgerConstructor = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const ingredients = useSelector(getConstructorIngredients);
	const bun = useSelector(getConstructorBun);
	const constructorIds = useSelector(getConstructorIds);
	const [modalIsActive, setModalActive] = useState(false);
	const [ingredientsError, setIngredientsError] = useState(false);
	const user = useSelector(getUserInfo);

	const handleClick = () => {
		if (!user) {
			navigate('/login');
			return;
		}

		if (!bun || ingredients.length === 0) {
			setIngredientsError(true);
			setModalActive(true);
			return;
		}

		dispatch(loadOrders(constructorIds))
			.unwrap()
			.then(() => {
				dispatch(clearConstructor());
				dispatch(clearCounters());
			})
			.catch((error: Error) => {
				console.error('Ошибка при оформлении заказа:', error);
			});

		setModalActive(true);
	};

	const onClose = () => {
		dispatch(removeOrderNum());
		setModalActive(false);
		setIngredientsError(false);
	};

	const totalSum = useCallback(() => {
		let sum = 0;
		if (bun) {
			sum += bun.price * 2;
		}

		if (ingredients.length > 0) {
			ingredients.forEach((element) => {
				sum += element.price;
			});
		}
		return sum;
	}, [ingredients, bun]);

	return (
		<section className={`${styles.ingredientsWrapper} pt-25`}>
			<DropContainer type='bun' position='top'></DropContainer>
			<DropContainer type='ingredient'></DropContainer>
			<DropContainer type='bun' position='bottom'></DropContainer>
			<div className={`${styles.info} mt-10`}>
				<div className={`${styles.total} mr-10`}>
					<span className='text text_type_digits-medium mr-2'>
						{totalSum()}
					</span>
					<CurrencyIcon type='primary' />
				</div>
				<Button
					htmlType='button'
					type='primary'
					size='medium'
					data-testid='create-order-button'
					onClick={handleClick}>
					Оформить заказ
				</Button>
			</div>
			{modalIsActive && (
				<Modal onClose={onClose}>
					<OrderDetails ingredientsError={ingredientsError}></OrderDetails>
				</Modal>
			)}
		</section>
	);
};

export default BurgerConstructor;
