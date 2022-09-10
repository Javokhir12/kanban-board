import { IIssue } from './issue';

export interface IColumn {
  issues?: IIssue[];
  title: string;
}
