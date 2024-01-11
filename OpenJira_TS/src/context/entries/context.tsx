import { Dispatch, createContext } from 'react';
import { ACTION_TYPE } from './';
import { ENTRY_INTERFACE } from '@/types';

interface ENTRIES_CONTEXT_INTERFACE {
  entries: ENTRY_INTERFACE[];
  dispatch: Dispatch<ACTION_TYPE>;
}

export const Context = createContext({} as ENTRIES_CONTEXT_INTERFACE)
