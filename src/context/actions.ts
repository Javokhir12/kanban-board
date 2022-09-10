import { IColumn } from '../models/column';
import { IIssue } from '../models/issue';

export const ADD_COLUMN = 'ADD_COLUMN';
export const ADD_ISSUE = 'ADD_ISSUE';

export const addColumn = (column: IColumn) =>
  ({
    type: ADD_COLUMN,
    payload: column,
  } as const);

export const addIssue = (issue: IIssue) =>
  ({
    type: ADD_ISSUE,
    payload: issue,
  } as const);

export type ActionType =
  | ReturnType<typeof addColumn>
  | ReturnType<typeof addIssue>;
