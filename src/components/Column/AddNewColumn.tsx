import classes from './Column.module.css';
export interface AddNewColumnProps {
  openModal: () => void;
}

function AddNewColumn({ openModal }: AddNewColumnProps) {
  return (
    <div
      onClick={openModal}
      className={`m-4 py-2 px-10 flex items-center justify-center hover:shadow-lg hover:shadow-slate-700 hover:cursor-pointer ${classes.columnWidth}`}
    >
      <h2 className="text-center text-gray-300 text-2xl font-extrabold">
        + New Column
      </h2>
    </div>
  );
}

export default AddNewColumn;
