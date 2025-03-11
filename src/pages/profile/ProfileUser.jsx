import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	PasswordInput,
	EmailInput,
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Profile.module.scss';
import { getUserInfo, login, refresh } from '../../services/userSlice';

export const ProfileUser = () => {
	const dispatch = useDispatch();
	const initialState = useSelector(getUserInfo);
	const [formData, setFormData] = useState({
		...initialState,
		password: '*****',
	});
	const [isChanged, setIsChanged] = useState(false);

	const onChange = (e) => {
		const { value, name } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
		setIsChanged(true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(refresh(formData));
	};

	const handleCancel = () => {
		setFormData({ ...initialState, password: '*****' });
	};

	return (
		<form className={`${styles.form} mt-30`} onSubmit={handleSubmit}>
			<Input
				type={'text'}
				placeholder={'Имя'}
				value={formData.name}
				name={'name'}
				onChange={onChange}
				error={false}
				errorText={'Ошибка'}
				size={'default'}
				extraClass='mb-6'
			/>
			<EmailInput
				onChange={onChange}
				value={formData.email}
				name={'email'}
				isIcon={true}
				extraClass='mb-6'
			/>
			<PasswordInput
				onChange={onChange}
				value={formData.password}
				name={'password'}
				extraClass='mb-6'
			/>
			{isChanged && (
				<div className={styles.buttonsGroup}>
					<button
						className={`text text_type_main-default ${styles.cancelBtn}`}
						htmlType='button'
						onClick={handleCancel}>
						Отмена
					</button>
					<Button htmlType='submit' type='primary' size='medium'>
						Сохранить
					</Button>
				</div>
			)}
		</form>
	);
};
