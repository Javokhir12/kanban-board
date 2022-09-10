export interface AddNewColumnProps {
  onAddColumn: () => void;
}

function AddNewColumn({ onAddColumn }: AddNewColumnProps) {
  return (
    <div className="m-4 p-2 flex items-center justify-center grow">
      <h2
        onClick={onAddColumn}
        className="text-center text-gray-300 text-5xl font-extrabold hover:cursor-pointer"
      >
        + New Column
      </h2>
    </div>
  );
}

export default AddNewColumn;
