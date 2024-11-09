import styles from './modal-overlay.module.css';
import { modalOverlayProps } from '../../../utils/prop-types';
import React from 'react';

const ModalOverlay: React.FC<modalOverlayProps> = ({ onClick }) => {
	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (onClick) {
			onClick();
		}
	};

	return <div className={styles.overlay} onClick={handleClick}></div>;
};

export default ModalOverlay;
