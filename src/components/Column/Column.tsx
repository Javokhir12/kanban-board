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

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.ISSU_CARD,
      drop: () => {
        if (currentDraggedIssue) {
          const issue = issues[currentDraggedIssue];
          issue.columnId = id;
          dispatch(addIssue(issue));
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [currentDraggedIssue]
  );

  console.log();
  return (
    <div
      ref={drop}
      className={`m-4 p-2 ${classes.columnWidth} ${
        isOver ? 'dark:bg-slate-700 bg-gray-200' : ''
      }`}
    >
      <h2 className="text-center dark:text-gray-300 text-xl">{title}</h2>
      {children}
    </div>
  );
}

export default Column;
