import { ENTRY_INTERFACE, ENTRY_STATUS_TYPE } from '@/types';
import { STATE } from './';

export type ACTION_TYPE =
  | { type: 'New Entry'; payload: {entry: ENTRY_INTERFACE} }
  | { type: 'Update Entry Status'; payload: {entry: ENTRY_INTERFACE} }
  | { type: 'Get Entries'; payload: { entries: ENTRY_INTERFACE[] } }
  | { type: 'Delete Entry'; payload: { id: string } }

export const Reducer = (state: STATE, action: ACTION_TYPE): STATE => {
  switch (action.type) {
    case 'New Entry':
      return {
        ...state,
        entries: [...state.entries, action.payload.entry],
      };
    case 'Get Entries':
      return {
        ...state,
        entries: [...state.entries, ...action.payload.entries],
      };
    case 'Update Entry Status':
      return {
        ...state,
        entries: state.entries.map(entry =>
          entry._id === action.payload.entry._id ? { ...action.payload.entry } : entry,
        ),
      };
    case 'Delete Entry':
      return {
        ...state,
        entries: state.entries.filter(entry =>
          entry._id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};
