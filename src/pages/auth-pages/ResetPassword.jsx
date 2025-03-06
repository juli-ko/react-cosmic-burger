import { useState, useRef } from 'react';
import {
	PasswordInput,
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './Auth-pages.module.scss';

export const ResetPassword = () => {
	const [value, setValue] = useState('');
	const [valueName, setValueName] = useState('');
	const inputRef = useRef();

	const onChange = (e) => {
		setValue(e.target.value);
	};

	return (
		<div className={styles.formPage}>
			<form className={styles.form}>
				<h1 className='text text_type_main-medium mb-6'>
					Восстановление пароля
				</h1>
				<PasswordInput
					onChange={onChange}
					value={value}
					name={'password'}
					extraClass='mb-6'
					placeholder={'Введите новый пароль'}
				/>
				<Input
					type={'text'}
					placeholder={'Введите код из письма'}
					value={valueName}
					name={'name'}
					error={false}
					ref={inputRef}
					errorText={'Ошибка'}
					size={'default'}
					extraClass='mb-6'
				/>
				<Button htmlType='button' type='primary' size='medium'>
					Сохранить
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
