import styles from './modal.module.css';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';

const modalElement = document.getElementById('modal');

const Modal = ({ title, children, onCloseModal }) => {
  useEffect(() => {
    const handleEscape = event => {
      event.key === 'Escape' && onCloseModal(event);
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

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  onCloseModal: PropTypes.func.isRequired
};

export default Modal;
