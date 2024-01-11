'use client'
import { useMemo, useReducer } from 'react';
import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from '@/themes';
import uiReducer from './reducer';
import { UI_CONTEXT } from './context';

export interface UI_STATE_INTERFACE {
  theme: PaletteMode;
}

export const INITIAL_STATE: UI_STATE_INTERFACE = {
  theme: 'light',
};

export const UiProvider: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, INITIAL_STATE);
  const theme = useMemo(() => createTheme(getTheme(state.theme) as ThemeOptions), [state.theme]);

  return (
    <UI_CONTEXT.Provider value={{ ...state, dispatch }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </UI_CONTEXT.Provider>
  );
};
