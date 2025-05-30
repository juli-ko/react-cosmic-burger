import {
	PasswordInput,
	EmailInput,
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './Auth-pages.module.scss';
import { register } from '../../services/userSlice';
import useForm from '../../hooks/useForm';
import { TFormData } from '../../utils/types';
import { useAppDispatch } from '../../hooks/redux-hooks';

export const Register = () => {
	const dispatch = useAppDispatch();
	const { formData, handleChange, validateEmail, validatePassword } = useForm<
		Pick<TFormData, 'password' | 'email' | 'name'>
	>({
		name: '',
		email: '',
		password: '',
	});

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		if (!validateEmail(formData.email)) {
			alert('Введите корректный email');
			return;
		}
		if (!validatePassword(formData.password)) {
			alert('Пароль должен быть длиннее 5 символов');
			return;
		}

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
