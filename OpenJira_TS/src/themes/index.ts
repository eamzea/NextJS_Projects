import { PaletteMode } from '@mui/material';

export const getTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'dark'
      ? {
          background: {
            default: '#0B0B09',
          },
        }
      : {
          background: {
            default: '#F5F5F5',
          },
        }),
  },
});
