import './App.css';
import Board from './components/Board/Board';
import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';

function App() {
  return (
    <>
      <Header />
      <Board />
      <Modal opened={true}>!!!Modal!!!</Modal>
    </>
  );
}

export default App;
