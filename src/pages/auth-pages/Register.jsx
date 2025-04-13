import { useState } from 'react';
import {
	PasswordInput,
	EmailInput,
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './Auth-pages.module.scss';
import { useDispatch } from 'react-redux';
import { register } from '../../services/userSlice';
import useForm from '../../hooks/useForm';

export const Register = () => {
	const dispatch = useDispatch();
	const { formData, handleChange } = useForm({
		name: '',
		email: '',
		password: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(register(formData));
	};

	return (
		<div className={styles.formPage}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
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
				<Button htmlType='submit' type='primary' size='medium'>
					Зарегистрироваться
				</Button>
				<div className={styles.links}>
					<p className='text text_type_main-default text_color_inactive mt-20'>
						Уже зарегистрированы?{' '}
						<Link to='/login' className={styles.link}>
							Войти
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};
