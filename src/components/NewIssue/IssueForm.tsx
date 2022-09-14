import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppContext } from '../../context';
import { IIssue } from '../../models/issue';
import { v4 as uuidv4 } from 'uuid';
import { useFocus } from '../../hooks/useFocus';

export interface FormState {
  title: string;
  points: string;
  status: string;
}

const defaultFormState: FormState = {
  title: '',
  points: '',
  status: '',
};

export interface IssueFormProps {
  handleSubmit: (issue: IIssue) => void;
  initialFormState?: FormState;
  formHeaderLabel?: string;
  submitButtonLabel?: string;
  issueId?: string;
}

function IssueForm({
  handleSubmit,
  initialFormState = defaultFormState,
  formHeaderLabel = 'Add New Task',
  submitButtonLabel = 'Create Task',
  issueId = uuidv4(),
}: IssueFormProps) {
  const {
    state: { columns },
  } = useAppContext();
  const inputRef = useFocus();

  const statuses = Object.values(columns).map(({ id, title }) => ({
    value: id,
    label: title,
  }));

  const [fromValues, setFormValues] = useState((): FormState => {
    return {
      ...initialFormState,
      status: initialFormState.status || statuses[0]?.value,
    };
  });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { points, status, title } = fromValues;

    const newIssue: IIssue = {
      columnId: status,
      id: issueId,
      points: parseFloat(points),
      title,
    };

    setFormValues(defaultFormState);
    handleSubmit(newIssue);
  };

  const isValid = Object.values(fromValues).every((value) => value !== '');

  if (statuses.length === 0)
    return (
      <article className="h-52 flex items-center justify-center bg-indigo-400 dark:bg-transparent">
        <h2 className="text-xl text-white font-extrabold">
          Please create a column first
        </h2>
      </article>
    );

  return (
    <form
      onSubmit={onSubmit}
      className="px-12 pt-8 pb-12 flex flex-col justify-center dark:text-white"
    >
      <h2 className="text-2xl">{formHeaderLabel}</h2>

      <p>
        <label htmlFor="issue-title" className="block my-4">
          Title
        </label>
        <input
          ref={inputRef}
          onChange={handleChange}
          name="title"
          type="text"
          value={fromValues.title}
          placeholder="e.g. Take coffee break"
          id="issue-title"
          className="bg-gray-200 p-3 rounded-md w-full outline-0 text-slate-500 focus:outline-4 outline-indigo-400"
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
          className="bg-gray-200 p-3 w-full rounded-md outline-0 text-slate-500 focus:outline-4 outline-indigo-400"
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
          className="bg-gray-200 p-3 w-full rounded-md text-slate-500 focus:outline-4 outline-indigo-400"
        >
          {statuses.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
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
          {submitButtonLabel}
        </button>
      </p>
    </form>
  );
}

export default IssueForm;
