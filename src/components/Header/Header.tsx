import { useEffect, useState } from 'react';
import { useAppContext } from '../../context';
import { addIssue } from '../../context/actions';
import { useThemeContext } from '../../context/theme-context';
import { useModal } from '../../hooks/useModal';
import { IIssue } from '../../models/issue';
import Modal from '../Modal/Modal';
import IssueForm from '../NewIssue/IssueForm';

function Header() {
  const { dispatch } = useAppContext();
  const { setTheme, theme } = useThemeContext();
  const { modalOpen, openModal, closeModal } = useModal(false);
  const [isDark, setIsDark] = useState(theme === 'dark');

  useEffect(() => {
    setTheme(isDark ? 'dark' : 'light');
  }, [isDark, setTheme]);

  const onCreateIssue = (issue: IIssue): void => {
    dispatch(addIssue(issue));
    closeModal();
  };

  return (
    <>
      <nav>
        <u className="py-6 px-16 flex list-none bg-white dark:bg-slate-700 justify-between items-center">
          <li>
            <span className="tracking-wide font-semibold dark:text-white text-3xl antialiased no-underline">
              Kanban
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span
              className="dark:text-white block mx-6 text-2xl hover:cursor-pointer"
              onClick={() => setIsDark((state) => !state)}
            >
              {!isDark ? <>&#9789;</> : <>&#9728;</>}
            </span>
            <button
              onClick={openModal}
              type="button"
              className="py-2 px-6 bg-indigo-400 font-semibold rounded-2xl text-white hover:cursor-pointer hover:bg-indigo-500"
            >
              + Add New Task
            </button>
          </li>
        </u>
      </nav>
      <Modal opened={modalOpen} handleClose={closeModal}>
        <IssueForm handleSubmit={onCreateIssue} />
      </Modal>
    </>
  );
}

export default Header;
