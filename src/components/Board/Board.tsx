import { useAppContext } from '../../context';
import { IColumn } from '../../models/column';
import { IIssue } from '../../models/issue';
import AddNewColumn from '../Column/AddNewColumn';
import Column from '../Column/Column';
import IssueCard from '../IssueCard/IssueCard';

function Board() {
  const { columns, dispatch } = useAppContext();

  const onAddColumn = () => {
    dispatch({
      type: 'ADD_COLUMN',
      payload: {
        issues: [
          {
            points: 1,
            status: 'To Do',
            title: 'Fix accessibility issues',
          },
        ],
        title: 'To Do',
      },
    });
  };

  return (
    <section className="bg-slate-800 grow flex justify-start overflow-auto">
      {renderColumns(columns)}
      <AddNewColumn onAddColumn={onAddColumn} />
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
