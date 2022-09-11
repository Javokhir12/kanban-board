import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';
import { IColumn } from '../models/column';
import { ActionType } from './actions';
import { reducer } from './reducer';

export interface IAppContext {
  columns: IColumn[];
  dispatch: Dispatch<ActionType>;
}

const AppContext = createContext<IAppContext | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [value, dispatch] = useReducer(reducer, []);

  const ctxValue = { columns: value, dispatch };
  // const ctxValue = useMemo(() => ({ boards: value, dispatch }), [value]);

  return <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const c = useContext(AppContext);
  if (c == null)
    throw new Error('useAppContext must be inside a Provider with a value');
  return c;
}
