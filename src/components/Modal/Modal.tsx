import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

import { UncontrolledForm } from '@/components';

import './ModalStyles.scss';

interface ModalProps {
  closeModal: () => void;
  modalType: string;
}

function Modal({ closeModal, modalType }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal();
    }

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [closeModal]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeModal]);

  return createPortal(
    <div className="modal" ref={modalRef}>
      {modalType === 'modal1' ? (
        <UncontrolledForm />
      ) : (
        'This is the SECOND modal'
      )}
      <button className="close-modal-bttn" onClick={closeModal}>
        &times;
      </button>
    </div>,
    document.getElementById('modal-overlay') as HTMLElement
  );
}

export default Modal;
