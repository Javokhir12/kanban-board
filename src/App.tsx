import './App.css';
import Board from './components/Board/Board';
import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';
import NewIssue from './components/NewIssue/NewIssue';

function App() {
  return (
    <>
      <Header />
      <Board />
      <Modal opened={true}>
        <NewIssue />
      </Modal>
    </>
  );
}

export default App;
