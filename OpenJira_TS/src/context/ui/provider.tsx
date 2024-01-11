import { useMemo, useReducer } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Reducer, UI_CONTEXT } from './';
import { getTheme } from '@/themes';

export interface UI_STATE_INTERFACE {
  theme: PaletteMode;
  isSidebarOpen: boolean;
  isDragging: boolean;
}

export const INITIAL_STATE: UI_STATE_INTERFACE = {
  theme: 'dark',
  isSidebarOpen: false,
  isDragging: false
};

export const Provider: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  const theme = useMemo(() => createTheme(getTheme(state.theme)), [state.theme]);

  return (
    <UI_CONTEXT.Provider value={{ ...state, dispatch }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </UI_CONTEXT.Provider>
  );
};
