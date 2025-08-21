import './ModalNavigationStyles.scss';

interface ModalNavigationProps {
  openModal: (modalType: string) => void;
  openedModal: string;
}

function ModalNavigation({ openModal, openedModal }: ModalNavigationProps) {
  return (
    <div className="modal-nav">
      <button
        className="modal-1-bttn"
        onClick={() => openModal('modal1')}
        disabled={openedModal === 'modal1'}
      >
        Form 1
      </button>

      <button
        className="modal-2-bttn"
        onClick={() => {
          openModal('modal2');
        }}
        disabled={openedModal === 'modal2'}
      >
        Form 2
      </button>
    </div>
  );
}

export default ModalNavigation;
