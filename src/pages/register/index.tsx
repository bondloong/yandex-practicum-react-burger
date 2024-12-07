import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import useFormData from '../../hooks/use-form-data';
import styles from './register.module.css';
import { registerUser } from '../../services/slices/user-slice';
import { useAppDispatch } from '../../services/slices';
import { FormEvent } from 'react';

export default function RegisterPage() {
	const { formData, onChangeFormData, checkFormData } = useFormData({
		name: '',
		email: '',
		password: '',
	});
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const location = useLocation();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formElement = e.target as HTMLFormElement;

		const isError = formElement.querySelector('.input__error');
		if (isError) return;

		if (checkFormData.status) {
			dispatch(registerUser(formData))
				.unwrap()
				.then(() => navigate(location.state?.from ?? '/', { replace: true }))
				.catch((err: Error) => {
					const error = Object.assign(document.createElement('p'), {
						className: 'input__error text_type_main-default',
						textContent: err.message,
					});

					const input =
						formElement.querySelector<HTMLInputElement>('[name="password"]');
					if (!input) {
						throw new Error('Input element not found');
					}

					const inputContainer = input.closest('.input');
					if (!inputContainer) {
						throw new Error('Input container not found');
					}

					const container = inputContainer.closest('.input__container');
					if (!container) {
						throw new Error('Input container not found');
					}

					container.append(error);

					setTimeout(() => {
						error.remove();
					}, 2000);
				});
		} else {
			const errorField = formElement.querySelector<HTMLInputElement>(
				`[name=${checkFormData.field}]`
			);
			errorField?.closest('.input')?.classList.add('input_status_error');
		}
	};

	return (
		<main className={`${styles.main}`}>
			<h1 className='text text_type_main-medium'>Регистрация</h1>
			<form className={`${styles.form} mt-6 mb-20`} onSubmit={handleSubmit}>
				<Input
					onChange={onChangeFormData}
					value={formData.name}
					name='name'
					type='text'
					placeholder='Имя'
				/>
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
					Зарегистрироваться
				</Button>
			</form>
			<span className='text text_type_main-default text_color_inactive'>
				Уже зарегистрированы? <Link to='/login'>Войти</Link>
			</span>
		</main>
	);
}
