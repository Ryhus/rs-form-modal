import { createPortal } from 'react-dom';

import './ModalStyles.scss';

interface ModalProps {
  closeModal: () => void;
  modalType: string;
}

function Modal({ closeModal, modalType }: ModalProps) {
  return createPortal(
    <div className="modal">
      {modalType === 'modal1'
        ? 'This is the FIRST modal'
        : 'This is the SECOND modal'}
      <button className="close-modal-bttn" onClick={closeModal}>
        &times;
      </button>
    </div>,
    document.getElementById('modal-overlay') as HTMLElement
  );
}

export default Modal;
