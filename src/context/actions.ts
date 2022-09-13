import { IColumn } from '../models/column';
import { IIssue } from '../models/issue';

export const ADD_COLUMN = 'ADD_COLUMN';
export const ADD_ISSUE = 'ADD_ISSUE';
export const EDIT_ISSUE = 'EDIT_ISSUE';
export const SET_DRAGGED_ISSUE = 'SET_DRAGGED_ISSUE';

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

export const editIssue = (issue: IIssue) =>
  ({
    type: EDIT_ISSUE,
    payload: issue,
  } as const);

export const setDraggedIssue = (issueId: string) =>
  ({
    type: SET_DRAGGED_ISSUE,
    payload: issueId,
  } as const);

export type ActionType =
  | ReturnType<typeof addColumn>
  | ReturnType<typeof addIssue>
  | ReturnType<typeof editIssue>
  | ReturnType<typeof setDraggedIssue>;
