import { v4 as uuid } from 'uuid';
import { ACTION_TYPE } from './reducer';
import { ENTRY_INTERFACE, ENTRY_STATUS_TYPE } from '@/types';

export const addNewEntry = (entry: ENTRY_INTERFACE): ACTION_TYPE => ({
  type: 'New Entry',
  payload: { entry },
});

export const updateEntryStatus = (entry: ENTRY_INTERFACE): ACTION_TYPE => ({
  type: 'Update Entry Status',
  payload: {entry},
});

export const loadInitialEntries = (entries: ENTRY_INTERFACE[]): ACTION_TYPE => ({
  type: 'Get Entries',
  payload: {entries}
})

export const deleteEntry = (id: string): ACTION_TYPE => ({
  type: 'Delete Entry',
  payload: {id}
})
