import { useMemo } from 'react';
import { useAppContext } from '../../context';
import { editIssue } from '../../context/actions';
import { useModal } from '../../hooks/useModal';
import { IIssue } from '../../models/issue';
import Modal from '../Modal/Modal';
import IssueForm from '../NewIssue/IssueForm';

export interface IssueCardPorps {
  title: string;
  points: number;
  status: string;
  id: string
}

function IssueCard({ title, points, status, id }: IssueCardPorps) {
  const { dispatch } = useAppContext();
  const { modalOpen, openModal, closeModal } = useModal(false);

  const initialFormState = useMemo(
    () => ({
      points: String(points),
      status,
      title,
    }),
    [points, status, title]
  );

  const handleEditIssue = (issue: IIssue): void => {
    dispatch(editIssue(issue));
    closeModal();
  };

  return (
    <>
      <article className="bg-slate-700 w-64 m-4 rounded-lg py-3 px-5 shadow-sm shadow-slate-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span onClick={openModal} className="hover:cursor-pointer">
            &#9998;
          </span>
        </div>
        <p className="text-gray-200">{pluralizePoints(points)}</p>
      </article>
      <Modal opened={modalOpen} handleClose={closeModal}>
        <IssueForm
          handleSubmit={handleEditIssue}
          formHeaderLabel="Edit Issue"
          submitButtonLabel="Save"
          initialFormState={initialFormState}
          issueId={id}
        />
      </Modal>
    </>
  );
}

export default IssueCard;

function pluralizePoints(points: number): string {
  return `${points} point${points === 1 ? '' : 's'}`;
}
