import { ReactNode } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../constants';
import { useAppContext } from '../../context';
import { addIssue } from '../../context/actions';

import classes from './Column.module.css';
export interface ColumnProps {
  title: string;
  children: ReactNode;
  id: string;
}

function Column({ id, title, children }: ColumnProps) {
  const {
    dispatch,
    state: { currentDraggedIssue, issues },
  } = useAppContext();

  const issue = issues[currentDraggedIssue];

  if (issue) {
    issue.columnId = id;
  }

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.ISSU_CARD,
      drop: () => {
        dispatch(addIssue(issue));
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [issue]
  );

  console.log();
  return (
    <div
      ref={drop}
      className={`m-4 p-2 ${classes.columnWidth} ${
        isOver ? 'bg-slate-700' : ''
      }`}
    >
      <h2 className="text-center dark:text-gray-300 text-xl">{title}</h2>
      {children}
    </div>
  );
}

export default Column;
