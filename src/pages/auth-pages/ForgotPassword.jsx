import { useState } from 'react';
import {
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './Auth-pages.module.scss';

export const ForgotPassword = () => {
	const [valueEmail, setValueEmail] = useState('');

	const onChange = (e) => {
		setValue(e.target.value);
	};

	return (
		<div className={styles.formPage}>
			<form className={styles.form}>
				<h1 className='text text_type_main-medium mb-6'>
					Восстановление пароля
				</h1>
				<EmailInput
					onChange={onChange}
					value={valueEmail}
					name={'email'}
					isIcon={true}
					extraClass='mb-6'
				/>
				<Button htmlType='button' type='primary' size='medium'>
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
