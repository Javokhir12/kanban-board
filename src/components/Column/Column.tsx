import { ReactNode } from 'react';

import classes from './Column.module.css';
export interface ColumnProps {
  title: string;
  children: ReactNode;
}

function Column({ title, children }: ColumnProps) {
  return (
    <div className={`m-4 p-2 ${classes.columnWidth}`}>
      <h2 className="text-center text-gray-300 text-xl">{title}</h2>
      {children}
    </div>
  );
}

export default Column;
