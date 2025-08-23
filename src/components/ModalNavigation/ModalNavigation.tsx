import './ModalNavigationStyles.scss';

interface ModalNavigationProps {
  openModal: (modalType: string) => void;
}

function ModalNavigation({ openModal }: ModalNavigationProps) {
  return (
    <div className="modal-nav">
      <button className="modal-1-bttn" onClick={() => openModal('modal1')}>
        Uncontrolled
      </button>

      <button
        className="modal-2-bttn"
        onClick={() => {
          openModal('modal2');
        }}
      >
        Controlled
      </button>
    </div>
  );
}

export default ModalNavigation;
