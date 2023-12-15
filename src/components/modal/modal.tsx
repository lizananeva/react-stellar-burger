import styles from './modal.module.css';
import { FC, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

type TModalProps = {
  title: string | null,
  children: ReactNode,
  onCloseModal: () => void
}

const modalElement = document.getElementById('modal') as HTMLElement;

const Modal: FC<TModalProps> = ({ title, children, onCloseModal }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      event.key === 'Escape' && onCloseModal();
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return createPortal((
    <>
    <div className={`${styles.modal} p-10`}>
      <button className={styles.close} type='button' onClick={onCloseModal}>
        <CloseIcon type='primary' />
      </button>
      {title && (<h2 className='text text_type_main-large mt-3 mb-3'>{title}</h2>)}
      {children}
    </div>
    <ModalOverlay onClose={onCloseModal} />
    </>
  ), modalElement);
}

export default Modal;
