import styles from './modal-overlay.module.scss';

const ModalOverlay = ({ onClose }) => {
	return <div className={styles.overlay} onClick={onClose}></div>;
};

export default ModalOverlay;
