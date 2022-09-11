import { ChangeEvent, FormEvent, useState } from 'react';

export interface NewIssueProps {
  statuses: string[];
}

export interface FormState {
  title: string;
  points: string;
  status: string;
}

function NewIssue() {
  const [fromValues, setFormValues] = useState<FormState>({
    title: '',
    points: '',
    status: '',
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
    console.log(fromValues);
  };

  const isValid = Object.values(fromValues).every((value) => value !== '');

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
          <option value="To Do">Todo</option>
          <option value="Done">Done</option>
        </select>
      </p>
      <p className="mt-9">
        <button
          type="submit"
          disabled={!isValid}
          className="bg-indigo-400 px-6 py-2 font-semibold rounded-xl w-full"
        >
          Create Task
        </button>
      </p>
    </form>
  );
}

export default NewIssue;
