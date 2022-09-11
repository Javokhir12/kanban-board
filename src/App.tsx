import { useState } from 'react';
import './App.css';
import Board from './components/Board/Board';
import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';
import NewIssue from './components/NewIssue/NewIssue';

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
        <NewIssue />
      </Modal>
    </>
  );
}

export default App;
