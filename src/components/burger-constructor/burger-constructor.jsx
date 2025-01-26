import { useState } from 'react';
import {
	ConstructorElement,
	DragIcon,
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { dataPropType } from '../../prop-types/prop-types';

import styles from './burger-constructor.module.scss';

const BurgerConstructor = ({ data }) => {
	const [modalIsActive, setModalActive] = useState(false);
	const bun = data[0];
	const chosenIngredients = [1, 4, 6, 13, 13];

	const handleClick = () => {
		setModalActive(true);
	};

	const onClose = () => {
		setModalActive(false);
	};

	return (
		<section className={`${styles.ingredientsWrapper} mr-5 ml-5 pt-25`}>
			<div className={`${styles.ingredient} mb-4 mr-4 ml-5`}>
				<ConstructorElement
					type='top'
					isLocked={true}
					text={`${bun.name} (верх)`}
					price={bun.price}
					thumbnail={bun.image}
				/>
			</div>
			<div className={`${styles.ingredientsScroll} mb-4 ml-5 p-2`}>
				{chosenIngredients.map((chosenId, id) => (
					<div className={styles.ingredient} key={id}>
						<DragIcon type='primary' />
						<ConstructorElement
							key={data[chosenId].id}
							text={data[chosenId].name}
							price={data[chosenId].price}
							thumbnail={data[chosenId].image}
						/>
					</div>
				))}
			</div>
			<div className={`${styles.ingredient} mr-4`}>
				<ConstructorElement
					type='bottom'
					isLocked={true}
					text={`${bun.name} (низ)`}
					price={bun.price}
					thumbnail={bun.image}
				/>
			</div>
			<div className={`${styles.info} mt-10`}>
				<div className={`${styles.total} mr-10`}>
					<span className='text text_type_digits-medium mr-2'>610</span>
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
					<OrderDetails orderNumber='034536'></OrderDetails>
				</Modal>
			)}
		</section>
	);
};

export default BurgerConstructor;

BurgerConstructor.propTypes = dataPropType.isRequired;
