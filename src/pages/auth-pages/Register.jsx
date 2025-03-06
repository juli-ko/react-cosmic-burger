import { useState, useRef } from 'react';
import {
	PasswordInput,
	EmailInput,
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './Auth-pages.module.scss';

export const Register = () => {
	const [value, setValue] = useState('');
	const [valueEmail, setValueEmail] = useState('');
	const [valueName, setValueName] = useState('');
	const inputRef = useRef();
	const onChange = (e) => {
		setValue(e.target.value);
	};
	return (
		<div className={styles.formPage}>
			<form className={styles.form}>
				<h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
				<Input
					type={'text'}
					placeholder={'Имя'}
					value={valueName}
					name={'name'}
					error={false}
					ref={inputRef}
					errorText={'Ошибка'}
					size={'default'}
					extraClass='mb-6'
				/>
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
