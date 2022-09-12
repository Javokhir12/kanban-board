import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as Storage from '../storage';

export interface ThemeContextInterface {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

export const ThemeContext = createContext<ThemeContextInterface | undefined>(
  undefined
);

export interface ThemeProviderProps {
  initialTheme?: string;
  children: ReactNode;
}

const THEME_STORAGE_KEY = '@kanban/color-theme';

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState(initState);

  const rawSetTheme = useCallback(
    (theme: string) => {
      const root = window.document.documentElement;
      const isDark = theme === 'dark';

      root.classList.remove(isDark ? 'light' : 'dark');
      root.classList.add(theme);

      Storage.setItem(THEME_STORAGE_KEY, theme);
    },
    [theme]
  );

  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  const ctxValue = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={ctxValue}>{children}</ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (ctx == undefined)
    throw new Error('useThemeContext must be inside a Provider with a value');
  return ctx;
}

const DEFAULT_THEME = 'light';

function initState(): string {
  try {
    const theme = Storage.getItem(THEME_STORAGE_KEY);

    return (theme ?? DEFAULT_THEME) as string;
  } catch (error) {
    console.error(error);

    return DEFAULT_THEME;
  }
}
