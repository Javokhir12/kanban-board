import { useAppContext } from '../../context';
import { addColumn } from '../../context/actions';
import { useModal } from '../../hooks/useModal';
import { IColumn } from '../../models/column';
import Modal from '../Modal/Modal';
import NewColumn from '../NewColumn/NewColumn';
import classes from './Column.module.css';

function AddNewColumn() {
  const { dispatch } = useAppContext();
  const { modalOpen, openModal, closeModal } = useModal(false);

  const onCreateColumn = (column: IColumn): void => {
    dispatch(addColumn(column));
    closeModal();
  };

  return (
    <>
      <div
        onClick={openModal}
        className={`m-4 py-2 px-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-700 hover:shadow-slate-700 hover:cursor-pointer ${classes.columnWidth}`}
      >
        <h2 className="text-center dark:text-gray-300 text-2xl font-extrabold">
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
