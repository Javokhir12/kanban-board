import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { ActionType } from './actions';
import { AppStateInterace, initialAppState, reducer } from './reducer';
import * as Storage from '../storage';

export interface IAppContext {
  state: AppStateInterace;
  dispatch: Dispatch<ActionType>;
}

export const COLUMNS_STORAGE_KEY = '@kanban/columns';

const AppContext = createContext<IAppContext | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [value, dispatch] = useReducer(reducer, initialAppState, initState);

  useEffect(() => {
    Storage.setItem(COLUMNS_STORAGE_KEY, value);
  }, [value]);

  const ctxValue = { state: value, dispatch };
  // const ctxValue = useMemo(() => ({ boards: value, dispatch }), [value]);

  return <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (ctx == undefined)
    throw new Error('useAppContext must be inside a Provider with a value');
  return ctx;
}

function initState<T>(initialState: T): T {
  try {
    const columns = Storage.getItem(COLUMNS_STORAGE_KEY);

    return (columns ?? initialState) as T;
  } catch (error) {
    console.error(error);

    return initialState;
  }
}
