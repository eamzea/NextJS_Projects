import { useEffect, useReducer } from 'react';
import { Context, Reducer, loadInitialEntries } from './';
import { ENTRY_INTERFACE } from '@/types';
import baseEntriesApi from '@/api/entries';

export interface STATE {
  entries: ENTRY_INTERFACE[];
}

export const INITIAL_STATE: STATE = {
  entries: [],
};

export const ENTRIES_PROVIDER: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    getInitialEntries()
  }, [])

  const getInitialEntries = async () => {
    const { data } = await baseEntriesApi.get('/entries');

    dispatch(loadInitialEntries(data))
  }

  return <Context.Provider value={{ ...state, dispatch }}>{children}</Context.Provider>;
};
