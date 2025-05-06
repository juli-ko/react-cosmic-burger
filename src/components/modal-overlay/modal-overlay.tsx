import styles from './modal-overlay.module.scss';

type TModalOverlay = {
	onClose: () => void;
};

const ModalOverlay = ({ onClose }: TModalOverlay) => {
	return <div className={styles.overlay} onClick={onClose}></div>;
};

export default ModalOverlay;
