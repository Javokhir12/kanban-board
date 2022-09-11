import { useState } from 'react';
import { useAppContext } from '../../context';
import { IColumn } from '../../models/column';
import { IIssue } from '../../models/issue';
import AddNewColumn from '../Column/AddNewColumn';
import Column from '../Column/Column';
import IssueCard from '../IssueCard/IssueCard';
import Modal from '../Modal/Modal';
import NewColumn from '../NewColumn/NewColumn';

function Board() {
  const { columns } = useAppContext();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (): void => {
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
  };

  return (
    <section className="bg-slate-800 grow flex justify-start overflow-auto">
      {renderColumns(columns)}
      <AddNewColumn openModal={openModal} />
      <Modal handleClose={closeModal} opened={modalOpen}>
        <NewColumn closeModal={closeModal} />
      </Modal>
    </section>
  );
}

export default Board;

function renderColumns(columns: IColumn[]) {
  return columns.map((column, i) => (
    <Column key={column.title + i} title={column.title}>
      {renderIssues(column.issues)}
    </Column>
  ));
}

function renderIssues(issues: IIssue[] = []) {
  return issues.map((issue, j) => (
    <IssueCard
      key={issue.title + j}
      title={issue.title}
      points={issue.points}
    />
  ));
}
