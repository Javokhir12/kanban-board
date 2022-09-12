import { ChangeEvent, FormEvent, useState } from 'react';
import { IColumn } from '../../models/column';
import { v4 as uuidv4 } from 'uuid';

export interface NewColumnProps {
  onCreateColumn: (column: IColumn) => void;
}

function NewColumn({ onCreateColumn }: NewColumnProps) {
  const [title, setTitle] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newColumn: IColumn = {
      id: uuidv4(),
      title,
    };

    setTitle('');
    onCreateColumn(newColumn);
  };

  const isValid = title !== '';

  return (
    <form
      onSubmit={onSubmit}
      className="px-12 pt-8 pb-12 flex flex-col justify-center dark:text-white"
    >
      <h2 className="text-2xl">Add New Column</h2>

      <p>
        <label htmlFor="issue-title" className="block my-4">
          Title
        </label>
        <input
          onChange={handleChange}
          name="title"
          type="text"
          value={title}
          placeholder="e.g. Take coffee break"
          id="issue-title"
          className="p-3 rounded-md w-full bg-gray-200 outline-0 dark:text-slate-600 focus:outline-4 outline-indigo-400"
        />
      </p>
      <p className="mt-9">
        <button
          type="submit"
          disabled={!isValid}
          className="bg-indigo-400 disabled:bg-indigo-200 disabled:cursor-not-allowed px-6 py-2 font-semibold rounded-xl w-full"
        >
          Create Column
        </button>
      </p>
    </form>
  );
}

export default NewColumn;
