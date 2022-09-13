import { IColumn } from '../models/column';
import { IIssue } from '../models/issue';
import {
  ActionType,
  ADD_COLUMN,
  ADD_ISSUE,
  EDIT_ISSUE,
  SET_DRAGGED_ISSUE,
} from './actions';

export interface AppStateInterace {
  columns: {
    [columnId: string]: IColumn;
  };
  issues: {
    [issueId: string]: IIssue;
  };
  currentDraggedIssue: string;
}

export const initialAppState: AppStateInterace = {
  columns: {},
  issues: {},
  currentDraggedIssue: '',
};

export function reducer(
  state = initialAppState,
  action: ActionType
): AppStateInterace {
  switch (action.type) {
    case ADD_COLUMN: {
      const column = action.payload;

      return {
        ...state,
        columns: {
          ...state.columns,
          [column.id]: column,
        },
      };
    }
    case EDIT_ISSUE:
    case ADD_ISSUE: {
      const issue = action.payload;

      return {
        ...state,
        issues: {
          ...state.issues,
          [issue.id]: issue,
        },
      };
    }
    case SET_DRAGGED_ISSUE: {
      return {
        ...state,
        currentDraggedIssue: action.payload,
      };
    }
    default:
      return state;
  }
}
