import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { modalProps } from '../../utils/prop-types';

const modalRoot = document.getElementById('modals');

const Modal = ({ text, closeModal, children }: modalProps) => {
	useEffect(() => {
		document.addEventListener('keydown', handleKeyEscCloseModal);

		return () => {
			document.removeEventListener('keydown', handleKeyEscCloseModal);
		};
	}, []);

	const handleClickCloseModal = () => {
		closeModal();
	};

	const handleKeyEscCloseModal = (e: KeyboardEvent) => { 
		if (e.code === 'Escape') {
			closeModal();
		}
	};

	if (!modalRoot) return null;

	return createPortal(
		<>
			<ModalOverlay onClick={handleClickCloseModal} />
			<div className={styles.modal}>
				{text && (
					<h2
						className={`${styles.header} mt-10 ml-10 mr-10 text text_type_main-large`}>
						{text}
					</h2>
				)}
				<span className={styles.close} onClick={handleClickCloseModal}>
					<CloseIcon type='primary' />
				</span>
				{children}
			</div>
		</>,
		modalRoot
	);
};

export default Modal;