import { useState } from 'react';
import {
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth-pages.module.scss';
import { forgotPassword } from '../../utils/burger-api';

export const ForgotPassword = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');

	const onChange = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			forgotPassword(email);
			localStorage.setItem('visitedForgotPassword', true);
			navigate('/reset-password');
		} catch {
			alert('Возникла ошибка при восстановлении пароля');
		}
	};

	return (
		<div className={styles.formPage} onSubmit={handleSubmit}>
			<form className={styles.form}>
				<h1 className='text text_type_main-medium mb-6'>
					Восстановление пароля
				</h1>
				<EmailInput
					onChange={onChange}
					value={email}
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
