import {
	PasswordInput,
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth-pages.module.scss';
import { resetPassword } from '../../utils/burger-api';
import useForm from '../../hooks/useForm';
import { TFormData } from '../../utils/types';

export const ResetPassword = () => {
	const navigate = useNavigate();
	const { formData, handleChange, validatePassword } = useForm<
		Pick<TFormData, 'password' | 'token'>
	>({
		password: '',
		token: '',
	});

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		if (!validatePassword(formData.password)) {
			alert('Пароль должен быть длиннее 5 символов');
			return;
		}

		if (!formData.token.trim()) {
			alert('Введите код из письма');
			return;
		}

		try {
			await resetPassword(formData);
			navigate('/login');
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
				<PasswordInput
					onChange={handleChange}
					value={formData.password}
					name={'password'}
					extraClass='mb-6'
					placeholder={'Введите новый пароль'}
				/>
				<Input
					type={'text'}
					placeholder={'Введите код из письма'}
					value={formData.token}
					name={'token'}
					onChange={handleChange}
					error={false}
					errorText={'Ошибка'}
					size={'default'}
					extraClass='mb-6'
				/>
				<Button htmlType='submit' type='primary' size='medium'>
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
