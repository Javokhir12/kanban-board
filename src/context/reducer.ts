import { IColumn } from '../models/column';
import { ActionType, ADD_COLUMN, ADD_ISSUE } from './actions';

export function reducer(state: IColumn[] = [], action: ActionType) {
  switch (action.type) {
    case ADD_COLUMN:
      return [...state, action.payload];
    case ADD_ISSUE: {
      const { status } = action.payload;
      return state.map((column) => {
        if (column.title !== status) return column;

        return {
          ...column,
          issues: [...(column.issues || []), action.payload],
        };
      });
    }
    default:
      return state;
  }
}
