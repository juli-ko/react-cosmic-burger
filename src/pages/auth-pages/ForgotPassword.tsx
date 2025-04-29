import { useState } from 'react';
import {
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth-pages.module.scss';
import { forgotPassword } from '../../utils/burger-api';
import useForm from '../../hooks/useForm';

export const ForgotPassword = () => {
	const navigate = useNavigate();
	const { formData, handleChange, validateEmail } = useForm({
		email: '',
	});

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		if (!validateEmail(formData.email)) {
			alert('Введите корректный email');
			return;
		}

		try {
			await forgotPassword(formData.email);
			navigate('/reset-password', { state: { fromForgotPassword: true } });
		} catch {
			alert('Возникла ошибка при восстановлении пароля');
		}
	};

	return (
		<div className={styles.formPage}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<h1 className='text text_type_main-medium mb-6'>
					Восстановление пароля
				</h1>
				<EmailInput
					onChange={handleChange}
					value={formData.email}
					name={'email'}
					isIcon={true}
					extraClass='mb-6'
				/>
				<Button htmlType='submit' type='primary' size='medium'>
					Восстановить
				</Button>
				<div className={styles.links}>
					<p className='text text_type_main-default text_color_inactive mt-20 mb-4'>
						Вспомнили пароль?{' '}
						<Link to='/login' className={styles.link}>
							Войти
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};
