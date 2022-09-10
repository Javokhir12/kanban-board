import classes from './Column.module.css';
export interface AddNewColumnProps {
  onAddColumn: () => void;
}

function AddNewColumn({ onAddColumn }: AddNewColumnProps) {
  return (
    <div
      onClick={onAddColumn}
      className={`m-4 py-2 px-10 flex items-center justify-center hover:shadow-lg hover:shadow-slate-700 hover:cursor-pointer ${classes.addColumn}`}
    >
      <h2 className="text-center text-gray-300 text-2xl font-extrabold">
        + New Column
      </h2>
    </div>
  );
}

export default AddNewColumn;
