import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
	Input,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import useFormData from '../../hooks/use-form-data';
import styles from './reset-password.module.css';
import { passwordReset } from '../../utils/api';

export default function ResetPasswordPage() {
	const { formData, onChangeFormData, checkFormData } = useFormData({
		password: '',
		token: '',
	});
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.state?.message !== 'Reset email sent') {
			navigate('/forgot-password', { replace: true });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formElement = e.currentTarget;
		const isError = formElement.querySelector('.input__error');
		if (isError) return;

		if (checkFormData.status) {
			passwordReset(formData)
				.then((data) => data.success && navigate('/login', { replace: true }))
				.catch((err) => {
					const error = Object.assign(document.createElement('p'), {
						className: 'input__error text_type_main-default',
						textContent: err.message,
					});
					const input =
						formElement.querySelector<HTMLInputElement>('[name="token"]');
					if (!input) {
						console.error('Input with name "token" not found');
						return;
					}
					const inputContainer = input.closest('.input');
					if (!inputContainer) {
						console.error('Input container not found');
						return;
					}

					inputContainer.classList.add('input_status_error');

					const container = inputContainer.closest('.input__container');
					if (!container) {
						console.error('Input container not found');
						return;
					}

					container.append(error);

					setTimeout(() => {
						inputContainer.classList.remove('input_status_error');
						error.remove();
					}, 2000);
				});
		} else {
			const inputWithError = formElement.querySelector<HTMLInputElement>(
				`[name=${checkFormData.field}]`
			);
			if (!inputWithError) {
				console.error(`Input with name "${checkFormData.field}" not found`);
				return;
			}

			const inputContainer = inputWithError.closest('.input');
			if (!inputContainer) {
				console.error('Input container not found');
				return;
			}

			inputContainer.classList.add('input_status_error');
		}
	};

	return (
		<main className={`${styles.main}`}>
			<h1 className='text text_type_main-medium'>Восстановление пароля</h1>
			<form className={`${styles.form} mt-6 mb-20`} onSubmit={handleSubmit}>
				<PasswordInput
					onChange={onChangeFormData}
					value={formData.password}
					name='password'
					placeholder='Введите новый пароль'
				/>
				<Input
					onChange={onChangeFormData}
					value={formData.token}
					name='token'
					placeholder='Введите код из письма'
				/>
				<Button htmlType='submit' type='primary' size='medium'>
					Сохранить
				</Button>
			</form>
			<span className='text text_type_main-default text_color_inactive'>
				Вспомнили пароль? <Link to='/login'>Войти</Link>
			</span>
		</main>
	);
}
