import { useEffect, useMemo } from 'react';
import { useDrag } from 'react-dnd';
import Modal from '../Modal/Modal';
import IssueForm from '../NewIssue/IssueForm';
import { useAppContext } from '../../context';
import { editIssue, setDraggedIssue } from '../../context/actions';
import { useModal } from '../../hooks/useModal';
import { IIssue } from '../../models/issue';
import { ItemTypes } from '../../constants';

export interface IssueCardPorps {
  title: string;
  points: number;
  status: string;
  id: string;
}

function IssueCard({ title, points, status, id }: IssueCardPorps) {
  const { dispatch } = useAppContext();
  const { modalOpen, openModal, closeModal } = useModal(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ISSU_CARD,
    previewOptions: {
      
    },

    item: () => {
      dispatch(setDraggedIssue(id));
      return { id };
    },
    collect: (monitor: any) => {
      return {
        isDragging: !!monitor.isDragging(),
      };
    },
    end: () => {
      dispatch(setDraggedIssue(undefined));
    },
  }));

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
      {!isDragging && (
        <article
          ref={drag}
          className="bg-gray-100 cursor-move dark:bg-slate-700 w-80 m-4 rounded-lg py-3 px-5 shadow-sm shadow-slate-700"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white break-words">
              {title}
            </h3>
            <span
              onClick={openModal}
              className="hover:cursor-pointer dark:text-white"
            >
              &#9998;
            </span>
          </div>
          <p className="dark:text-gray-200 my-2">{pluralizePoints(points)}</p>
        </article>
      )}
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
