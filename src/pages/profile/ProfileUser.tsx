import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	PasswordInput,
	EmailInput,
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Profile.module.scss';
import { getUserInfo, refresh } from '../../services/userSlice';
import useForm from '../../hooks/useForm';

export const ProfileUser = () => {
	const dispatch = useDispatch();
	const initialState = useSelector(getUserInfo);
	const { formData, isChanged, handleChange, resetForm, validateEmail } =
		useForm({
			//@ts-expect-error "services"
			...initialState,
			password: '',
		});

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		if (!validateEmail(formData.email)) {
			alert('Введите корректный email');
			return;
		}

		//@ts-expect-error "services"
		dispatch(refresh(formData));
	};

	return (
		<form className={`${styles.form} mt-30`} onSubmit={handleSubmit}>
			<Input
				type={'text'}
				placeholder={'Имя'}
				value={formData.name}
				name={'name'}
				onChange={handleChange}
				error={false}
				errorText={'Ошибка'}
				size={'default'}
				extraClass='mb-6'
			/>
			<EmailInput
				onChange={handleChange}
				value={formData.email}
				name={'email'}
				isIcon={true}
				extraClass='mb-6'
			/>
			<PasswordInput
				onChange={handleChange}
				value={formData.password}
				name={'password'}
				extraClass='mb-6'
			/>
			{isChanged && (
				<div className={styles.buttonsGroup}>
					<button
						className={`text text_type_main-default ${styles.cancelBtn}`}
						onClick={resetForm}>
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
