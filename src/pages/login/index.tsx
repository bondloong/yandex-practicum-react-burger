import { Link, useLocation } from 'react-router-dom';
import {
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import useFormData from '../../hooks/use-form-data';
import styles from './login.module.css';
import { loginUser } from '../../services/slices/user-slice';
import { useAppDispatch } from '../../services/slices';

export default function LoginPage() {
	const { formData, onChangeFormData, checkFormData } = useFormData({
		email: '',
		password: '',
	});
	const dispatch = useAppDispatch();
	const location = useLocation();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const isError = form.querySelector('.input__error');
		if (isError) return;

		if (checkFormData.status) {
			dispatch(loginUser(formData))
				.unwrap()
				.catch((err: Error) => {
					const error = Object.assign(document.createElement('p'), {
						className: 'input__error text_type_main-default',
						textContent: err.message,
					});
					const passwordInput = form.querySelector('[name="password"]');
					if (passwordInput) {
						const inputContainer = passwordInput.closest('.input__container');
						if (inputContainer) {
							inputContainer.append(error);
						}
					}
					setTimeout(() => {
						error.remove();
					}, 2000);
				});
		} else {
			const errorField = form.querySelector(`[name=${checkFormData.field}]`);
			if (errorField) {
				const inputElement = errorField.closest('.input');
				if (inputElement) {
					inputElement.classList.add('input_status_error');
				}
			}
		}
	};

	return (
		<main className={`${styles.main}`}>
			<h1 className='text text_type_main-medium'>Вход</h1>
			<form className={`${styles.form} mt-6 mb-20`} onSubmit={handleSubmit}>
				<EmailInput
					onChange={onChangeFormData}
					value={formData.email}
					name='email'
					isIcon={false}
				/>
				<PasswordInput
					onChange={onChangeFormData}
					value={formData.password}
					name='password'
				/>
				<Button htmlType='submit' type='primary' size='medium'>
					Войти
				</Button>
			</form>
			<span className='text text_type_main-default text_color_inactive'>
				Вы — новый пользователь?{' '}
				<Link to='/register' state={{ from: location.state?.from }}>
					Зарегистрироваться
				</Link>
			</span>
			<span className='text text_type_main-default text_color_inactive mt-4'>
				Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link>
			</span>
		</main>
	);
}
