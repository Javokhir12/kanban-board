import { IColumn } from '../models/column';
import { IIssue } from '../models/issue';

export const ADD_COLUMN = 'ADD_COLUMN';
export const ADD_ISSUE = 'ADD_ISSUE';

export type ActionType =
  | { type: 'ADD_COLUMN'; payload: IColumn }
  | { type: 'ADD_ISSUE'; payload: IIssue };
