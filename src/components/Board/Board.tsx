import { useAppContext } from '../../context';
import { IColumn } from '../../models/column';
import { IIssue } from '../../models/issue';
import AddNewColumn from '../Column/AddNewColumn';
import Column from '../Column/Column';
import IssueCard from '../IssueCard/IssueCard';

function Board() {
  const {
    state: { columns, issues },
  } = useAppContext();

  return (
    <section className="bg-gray-300 dark:bg-slate-800 grow flex justify-start overflow-auto">
      {renderColumns(Object.values(columns), Object.values(issues))}
      <AddNewColumn />
    </section>
  );
}

export default Board;

export function renderColumns(columns: IColumn[] = [], issues: IIssue[] = []) {
  return columns.map(({ id, title }) => (
    <Column key={id} title={title}>
      {renderIssues(getIssuesWithColumnId(issues, id))}
    </Column>
  ));
}

export function renderIssues(issues: IIssue[] = []) {
  return issues.map(({ id, title, points, columnId }) => (
    <IssueCard
      key={id}
      title={title}
      points={points}
      status={columnId}
      id={id}
    />
  ));
}

export function getIssuesWithColumnId(
  issues: IIssue[],
  columnId: string
): IIssue[] {
  return issues.filter((issue) => issue.columnId === columnId);
}
