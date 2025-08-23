import { useState } from 'react';
import { ModalNavigation, Modal, UserList } from '@/components';

import './HomeStyles.scss';

function Home() {
  const [openedModal, setOpenedModal] = useState('');

  const handleOpenModal = (modalType: string) => {
    setOpenedModal(modalType);
  };

  const handleCloseModal = () => {
    setOpenedModal('');
  };

  return (
    <div className="home-page">
      {openedModal ? (
        <Modal closeModal={handleCloseModal} modalType={openedModal} />
      ) : (
        <>
          <ModalNavigation openModal={handleOpenModal} />
          <UserList />
        </>
      )}
    </div>
  );
}

export default Home;
