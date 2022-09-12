import { useState } from 'react';
import { useAppContext } from '../../context';
import { addIssue } from '../../context/actions';
import { useModal } from '../../hooks/useModal';
import { IIssue } from '../../models/issue';
import Modal from '../Modal/Modal';
import NewIssue from '../NewIssue/NewIssue';

function Header() {
  const { dispatch } = useAppContext();
  const { modalOpen, openModal, closeModal } = useModal(false);

  const onCreateIssue = (issue: IIssue): void => {
    dispatch(addIssue(issue));
    closeModal();
  };

  return (
    <>
      <nav>
        <u className="py-6 px-16 flex list-none bg-slate-700 justify-between items-center">
          <li>
            <span className="tracking-wide font-semibold text-white text-3xl antialiased ">
              Kanban
            </span>
          </li>
          <li>
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
        <NewIssue onCreateIssue={onCreateIssue} />
      </Modal>
    </>
  );
}

export default Header;
