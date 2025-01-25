import { ReactNode, useEffect } from 'react';

import { createPortal } from 'react-dom';
import { GridLoader } from 'react-spinners';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import { useAppSelector } from '../../services/store';
import ModalOverlay from './modal-overlay/modal-overlay';
import useShowModal from '../../hooks/use-show-modal';

const modalRoot = document.getElementById('modals');

export interface IModalProps {
	text?: string;
	onClose: () => void;
	children: ReactNode;
}

const Modal = ({ children, onClose }: IModalProps) => {
	const { isLoading } = useAppSelector((store) => store.orderDetails);
	const { isShowModal, closeModal } = useShowModal(true);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyEscCloseModal);

		return () => {
			document.removeEventListener('keydown', handleKeyEscCloseModal);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleCloseModal = () => {
		closeModal();
		if (onClose) onClose();
	};

	const handleKeyEscCloseModal = (e: KeyboardEvent) => {
		if (e.code === 'Escape') {
			handleCloseModal();
		}
	};

	if (!modalRoot) return null;

	return createPortal(
		isShowModal && (
			<>
				{isLoading ? (
					<>
						<ModalOverlay onClick={null} />
						<GridLoader
							color='#fff'
							loading={isLoading}
							cssOverride={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: "translate('-50%', '-50%')",
							}}
						/>
					</>
				) : (
					<>
						<ModalOverlay onClick={handleCloseModal} />
						<div className={styles.modal} data-testid='modal'>
							<button
								className={styles.close}
								onClick={handleCloseModal}
								data-testid='modal-close'>
								<CloseIcon type='primary' />
							</button>
							{children}
						</div>
					</>
				)}
			</>
		),
		modalRoot
	);
};

export default Modal;
