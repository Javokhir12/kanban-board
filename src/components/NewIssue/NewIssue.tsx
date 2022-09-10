function NewIssue() {
  return (
    <form className="px-12 pt-8 pb-12 flex flex-col justify-center">
      <h2 className="text-2xl">Add New Task</h2>

      <p>
        <label htmlFor="issue-title" className="block my-4">
          Title
        </label>
        <input
          type="text"
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
          defaultValue="Done"
          name="status"
          id="issue-status"
          className="p-3 w-full rounded-md text-slate-500 focus:outline-4 outline-indigo-400"
        >
          <option value="To Do">To Do</option>
          <option value="Done">Done</option>
        </select>
      </p>
      <p className="mt-9">
        <button
          type="submit"
          className="bg-indigo-400 px-6 py-2 font-semibold rounded-xl w-full"
        >
          Create Task
        </button>
      </p>
    </form>
  );
}

export default NewIssue;
