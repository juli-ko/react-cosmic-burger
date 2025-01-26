import styles from './modal-overlay.module.scss';
import PropTypes from 'prop-types';

const ModalOverlay = ({ onClose }) => {
	return <div className={styles.overlay} onClick={onClose}></div>;
};

export default ModalOverlay;

ModalOverlay.propTypes = {
	onClose: PropTypes.func.isRequired,
};
