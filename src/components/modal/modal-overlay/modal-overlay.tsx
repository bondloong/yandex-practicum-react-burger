import styles from './modal-overlay.module.css';
import { IModalOverlayProps } from '../../../utils/prop-types';
import React from 'react';

const ModalOverlay: React.FC<IModalOverlayProps> = ({ onClick }) => {
	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (onClick) {
			onClick();
		}
	};

	return <div className={styles.overlay} onClick={handleClick}></div>;
};

export default ModalOverlay;
