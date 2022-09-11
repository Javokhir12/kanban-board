import { useState } from 'react';
import Board from './components/Board/Board';
import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';
import NewIssue from './components/NewIssue/NewIssue';
import './App.css';
import { useAppContext } from './context';

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const openModal = (): void => {
    setModalOpen(true);
  };

  return (
    <>
      <Header openModal={openModal} />
      <Board />
      <Modal opened={modalOpen} handleClose={closeModal}>
        <NewIssue closeModal={closeModal} />
      </Modal>
    </>
  );
}

export default App;
