import { useState } from 'react';
import {
	PasswordInput,
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './Auth-pages.module.scss';

export const Login = () => {
	const [value, setValue] = useState('');
	const [valueEmail, setValueEmail] = useState('');
	const onChange = (e) => {
		setValue(e.target.value);
	};
	return (
		<div className={styles.formPage}>
			<form className={styles.form}>
				<h1 className='text text_type_main-medium mb-6'>Вход</h1>
				<EmailInput
					onChange={onChange}
					value={valueEmail}
					name={'email'}
					isIcon={true}
					extraClass='mb-6'
				/>
				<PasswordInput
					onChange={onChange}
					value={value}
					name={'password'}
					extraClass='mb-6'
				/>
				<Button htmlType='button' type='primary' size='medium'>
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
