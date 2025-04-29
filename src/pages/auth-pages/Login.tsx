import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	PasswordInput,
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './Auth-pages.module.scss';
import { login } from '../../services/userSlice';
import useForm from '../../hooks/useForm';

export const Login = () => {
	const dispatch = useDispatch();
	const { formData, handleChange, validateEmail } = useForm({
		email: '',
		password: '',
	});

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		if (!validateEmail(formData.email)) {
			alert('Введите корректный email');
			return;
		}
		try {
			//@ts-expect-error "services"
			await dispatch(login(formData)).unwrap();
		} catch {
			alert('Пользователь не найден');
		}
	};

	return (
		<div className={styles.formPage}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<h1 className='text text_type_main-medium mb-6'>Вход</h1>
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
					Войти
				</Button>
				<div className={styles.links}>
					<p className='text text_type_main-default text_color_inactive mt-20 mb-4'>
						Вы — новый пользователь?{' '}
						<Link to='/register' className={styles.link}>
							Зарегистрироваться
						</Link>
					</p>
					<p className='text text_type_main-default text_color_inactive'>
						Забыли пароль?{' '}
						<Link to='/forgot-password' className={styles.link}>
							Восстановить пароль
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};
