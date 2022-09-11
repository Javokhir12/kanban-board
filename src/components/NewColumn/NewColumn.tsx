import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppContext } from '../../context';
import { addColumn } from '../../context/actions';
import { IColumn } from '../../models/column';

export interface NewColumnProps {
  closeModal: () => void;
}

function NewColumn({ closeModal }: NewColumnProps) {
  const { dispatch } = useAppContext();

  const [title, setTitle] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newColumn: IColumn = {
      title,
      issues: [],
    };

    dispatch(addColumn(newColumn));
    closeModal();
  };

  const isValid = title !== '';

  return (
    <form
      onSubmit={onSubmit}
      className="px-12 pt-8 pb-12 flex flex-col justify-center"
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
          className="p-3 rounded-md w-full outline-0 text-slate-500 focus:outline-4 outline-indigo-400"
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
