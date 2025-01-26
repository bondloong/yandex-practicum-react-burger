import styles from './modal-overlay.module.css';
import React from 'react';

export interface IModalOverlayProps {
	onClick: (() => void) | null;
}

const ModalOverlay: React.FC<IModalOverlayProps> = ({ onClick }) => {
	const handleClick = () => {
		if (onClick) {
			onClick();
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Escape' || event.key === ' ') {
			handleClick();
		}
	};

	return (
		<div
			className={styles.overlay}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			role='button'
			tabIndex={0}></div>
	);
};

export default ModalOverlay;
