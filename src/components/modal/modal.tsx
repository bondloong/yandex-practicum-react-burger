import { useEffect } from 'react';

import { createPortal } from 'react-dom';
import { GridLoader } from 'react-spinners';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import { useAppSelector } from '../../services/slices';
import { IModalProps } from '../../utils/prop-types';
import ModalOverlay from './modal-overlay/modal-overlay';

const modalRoot = document.getElementById('modals');

const Modal = ({ text, closeModal, children }: IModalProps) => {
	const { isLoading } = useAppSelector((store) => store.orderDetails);

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
			<ModalOverlay onClick={isLoading ? null : handleClickCloseModal} />
			{isLoading ? (
				<GridLoader color='#fff' loading={isLoading} cssOverride={{ position: 'absolute', top: '50%', left: '50%', transform: "translate('-50%', '-50%')" }} />
			) : (
				<div className={styles.modal}>
					{text && <h2 className={`${styles.header} mt-10 ml-10 mr-10 text text_type_main-large`}>{text}</h2>}
					<span className={styles.close} onClick={handleClickCloseModal}>
						<CloseIcon type='primary' />
					</span>
					{children}
				</div>
			)}
		</>,
		modalRoot
	);
};

export default Modal;
