import { useState } from 'react';
import { useAppContext } from '../../context';
import { addColumn } from '../../context/actions';
import { IColumn } from '../../models/column';
import Modal from '../Modal/Modal';
import NewColumn from '../NewColumn/NewColumn';
import classes from './Column.module.css';

function AddNewColumn() {
  const { dispatch } = useAppContext();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (): void => {
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const onCreateColumn = (column: IColumn): void => {
    dispatch(addColumn(column));
    closeModal();
  };

  return (
    <>
      <div
        onClick={openModal}
        className={`m-4 py-2 px-10 flex items-center justify-center hover:shadow-lg hover:shadow-slate-700 hover:cursor-pointer ${classes.columnWidth}`}
      >
        <h2 className="text-center text-gray-300 text-2xl font-extrabold">
          + New Column
        </h2>
      </div>
      <Modal handleClose={closeModal} opened={modalOpen}>
        <NewColumn onCreateColumn={onCreateColumn} />
      </Modal>
    </>
  );
}

export default AddNewColumn;
