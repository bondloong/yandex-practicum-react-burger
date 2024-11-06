import styles from './modal-overlay.module.css';
import { modalOverlayProps } from '../../../utils/prop-types';

const ModalOverlay = ({ onClick }: modalOverlayProps) => {
	return <div className={styles.overlay} onClick={onClick}></div>;
};

export default ModalOverlay;
