import { Dispatch, createContext } from 'react';
import { PaletteMode } from '@mui/material';
import { ACTION_TYPE } from './reducer';

export interface UI_CONTEXT_INTERFACE {
  theme: PaletteMode;
  isSidebarOpen: boolean;
  isDragging: boolean;
  dispatch: Dispatch<ACTION_TYPE>;
}

export const UI_CONTEXT = createContext({} as UI_CONTEXT_INTERFACE)
