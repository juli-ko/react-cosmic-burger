import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	ConstructorElement,
	DragIcon,
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {
	getConstructorBun,
	getConstructorIngredients,
	getConstructorIds,
	removeItemFromConstructor,
} from '../../services/constructorSlice';
import {
	loadOrders,
	removeOrderNum,
} from '../../services/orderDetailsSlice';
import styles from './burger-constructor.module.scss';

const BurgerConstructor = () => {
	const dispatch = useDispatch();
	const ingredients = useSelector(getConstructorIngredients);
	const bun = useSelector(getConstructorBun);
	const constructorIds = useSelector(getConstructorIds);
	const [modalIsActive, setModalActive] = useState(false);

	const handleClick = () => {
		dispatch(loadOrders(constructorIds));
		setModalActive(true);
	};

	const onClose = () => {
		dispatch(removeOrderNum());
		setModalActive(false);
	};

	const handleRemove = (item) => {
		dispatch(removeItemFromConstructor(item));
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
		<section className={`${styles.ingredientsWrapper} mr-5 ml-5 pt-25`}>
			<div className={`${styles.ingredient} mb-4 mr-4 ml-5`}>
				{bun ? (
					<ConstructorElement
						type='top'
						isLocked={true}
						text={`${bun.name} (верх)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				) : (
					<div
						className={`constructor-element constructor-element_pos_top ${styles.skeleton}`}>
						<p className='text text_type_main-default text_color_inactive'>
							Выберите булку
						</p>
					</div>
				)}
			</div>
			<div className={`${styles.ingredientsScroll} mb-4 ml-5 p-2`}>
				{ingredients.length <= 0 && (
					<div className={`constructor-element ${styles.skeleton}`}>
						<p className='text text_type_main-default text_color_inactive'>
							Выберите начинку и соус
						</p>
					</div>
				)}
				{ingredients.map((item) => (
					<div className={styles.ingredient} key={item.key}>
						<DragIcon type='primary' />
						<ConstructorElement
							text={item.name}
							price={item.price}
							thumbnail={item.image}
							handleClose={() => handleRemove(item)}
						/>
					</div>
				))}
			</div>
			<div className={`${styles.ingredient} mr-4`}>
				{bun ? (
					<ConstructorElement
						type='bottom'
						isLocked={true}
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				) : (
					<div
						className={`constructor-element constructor-element_pos_bottom ${styles.skeleton}`}>
						<p className='text text_type_main-default text_color_inactive'>
							Выберите булку
						</p>
					</div>
				)}
			</div>
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
					onClick={handleClick}>
					Оформить заказ
				</Button>
			</div>
			{modalIsActive && (
				<Modal onClose={onClose}>
					<OrderDetails></OrderDetails>
				</Modal>
			)}
		</section>
	);
};

export default BurgerConstructor;
