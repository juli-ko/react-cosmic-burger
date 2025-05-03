import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.scss';

const modalRoot = document.getElementById('modals');

type TModal = {
	children: React.JSX.Element;
	header?: string;
	onClose: () => void;
};

const Modal = ({ children, header, onClose }: TModal) => {
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};
		document.addEventListener('keydown', handleEsc);

		return () => {
			document.removeEventListener('keydown', handleEsc);
		};
	}, [onClose]);

	if (!modalRoot) {
		console.error("Modal root element with id 'modals' not found.");
		return null;
	}

	return ReactDOM.createPortal(
		<>
			<ModalOverlay onClose={onClose}></ModalOverlay>
			<div className={styles.modal}>
				<div className={`${styles.header} mt-10 mr-10 ml-10`}>
					<h2 className='text text_type_main-large'>{header}</h2>
					<button className={styles.closeBtn} onClick={onClose}>
						<CloseIcon type='primary' />
					</button>
				</div>
				{children}
			</div>
		</>,
		modalRoot
	);
};
export default Modal;
