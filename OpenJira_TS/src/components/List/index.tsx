import Link from 'next/link';
import { DragEvent, useContext, useMemo } from 'react';
import { Paper, List as MuiList } from '@mui/material';
import Entry from '../Entry';
import { ENTRY_INTERFACE, ENTRY_STATUS_TYPE } from '@/types';
import { Context as EntriesContext, updateEntryStatus } from '@/context/entries';
import { UI_CONTEXT, toggleDragging } from '@/context/ui';
import baseEntriesApi from '@/api/entries';

interface ListProps {
  status: ENTRY_STATUS_TYPE;
  isAdding: boolean;
}

const List: React.FC<ListProps> = ({ status, isAdding }) => {
  const { entries, dispatch } = useContext(EntriesContext);
  const { isDragging, dispatch: uiDispatch } = useContext(UI_CONTEXT);

  const currentEntries = useMemo(() => {
    return entries.filter(entry => entry.status === status);
  }, [entries]);

  const handleDrop = async (event: DragEvent) => {
    const id = event.dataTransfer.getData('entry');

    const { data } = await baseEntriesApi.put<ENTRY_INTERFACE>(`/entries/${id}`, {
      status,
    });

    dispatch(updateEntryStatus(data));
    uiDispatch(toggleDragging());
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={event => event.preventDefault()}
    >
      <Paper
        sx={{
          height: `calc(100vh - ${
            status === 'pending' ? (isAdding ? '17.75rem' : '14rem') : '11rem'
          })`,
          backgroundColor: 'transparent',
          overflowY: 'scroll',
          border: isDragging ? '1px dashed white' : 'none',
          opacity: isDragging ? '0.5' : 1,
        }}
      >
        <MuiList sx={{ opacity: 1, padding: '0.5rem' }}>
          {currentEntries.map(card => (
            <Link
              href={`entry/${card._id}`}
              key={card._id}
            >
                <Entry entry={card} />
            </Link>
          ))}
        </MuiList>
      </Paper>
    </div>
  );
};

export default List;
