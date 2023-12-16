import styles from './modal-overlay.module.css';
import { FC } from 'react';

type TModalOverlayProps = {
  onClose: () => void
}

const ModalOverlay: FC<TModalOverlayProps> = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}></div>
  );
}

export default ModalOverlay;
