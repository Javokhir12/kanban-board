import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppContext } from '../../context';
import { addIssue } from '../../context/actions';
import { IIssue } from '../../models/issue';

export interface NewIssueProps {
  closeModal: () => void;
}

export interface FormState {
  title: string;
  points: string;
  status: string;
}

const initialFormState: FormState = {
  title: '',
  points: '',
  status: '',
};

function NewIssue({ closeModal }: NewIssueProps) {
  const { dispatch, columns } = useAppContext();

  const statuses = columns.map((column) => column.title);

  const [fromValues, setFormValues] = useState<FormState>((): FormState => {
    return {
      ...initialFormState,
      status: statuses[0],
    };
  });

  function handleChange<T extends HTMLInputElement | HTMLSelectElement>(
    e: ChangeEvent<T>
  ) {
    setFormValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newIssue: IIssue = {
      ...fromValues,
      points: parseFloat(fromValues.points),
    };

    dispatch(addIssue(newIssue));
    setFormValues(initialFormState);
    closeModal();
  };

  const isValid = Object.values(fromValues).every((value) => value !== '');

  if (statuses.length === 0)
    return (
      <article className="h-52 flex items-center justify-center">
        <h2 className="text-xl text-white font-extrabold">
          Please create a column first
        </h2>
      </article>
    );

  return (
    <form
      onSubmit={onSubmit}
      className="px-12 pt-8 pb-12 flex flex-col justify-center"
    >
      <h2 className="text-2xl">Add New Task</h2>

      <p>
        <label htmlFor="issue-title" className="block my-4">
          Title
        </label>
        <input
          onChange={handleChange}
          name="title"
          type="text"
          value={fromValues.title}
          placeholder="e.g. Take coffee break"
          id="issue-title"
          className="p-3 rounded-md w-full outline-0 text-slate-500 focus:outline-4 outline-indigo-400"
        />
      </p>
      <p>
        <label htmlFor="issue-points" className="block my-4">
          Points
        </label>
        <input
          type="number"
          name="points"
          value={fromValues.points}
          onChange={handleChange}
          placeholder="e.g. 3"
          id="issue-points"
          className="p-3 w-full rounded-md outline-0 text-slate-500 focus:outline-4 outline-indigo-400"
        />
      </p>
      <p>
        <label htmlFor="issue-status" className="block my-4">
          Status
        </label>
        <select
          name="status"
          value={fromValues.status}
          id="issue-status"
          onChange={handleChange}
          className="p-3 w-full rounded-md text-slate-500 focus:outline-4 outline-indigo-400"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </p>
      <p className="mt-9">
        <button
          type="submit"
          disabled={!isValid}
          className="bg-indigo-400 disabled:bg-indigo-200 disabled:cursor-not-allowed px-6 py-2 font-semibold rounded-xl w-full"
        >
          Create Task
        </button>
      </p>
    </form>
  );
}

export default NewIssue;
