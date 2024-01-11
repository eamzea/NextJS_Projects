import { PaletteMode } from '@mui/material';
import { darkTheme } from './dark-theme';
import { lightTheme } from './light-theme';

export const getTheme = (mode: PaletteMode) => ({
  ...(mode === 'dark' ? darkTheme : lightTheme)
});
