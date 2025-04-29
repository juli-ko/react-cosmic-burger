import styles from './modal-overlay.module.scss';

type ModalOverlayProp = {
	onClose: () => void;
};

const ModalOverlay = ({ onClose }: ModalOverlayProp) => {
	return <div className={styles.overlay} onClick={onClose}></div>;
};

export default ModalOverlay;
