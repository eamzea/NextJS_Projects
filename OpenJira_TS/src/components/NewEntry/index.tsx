import { Box, Button, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useContext, useState } from 'react';
import { Context as EntriesContext, addNewEntry } from '@/context/entries';
import baseEntriesApi from '@/api/entries';
import { ENTRY_INTERFACE } from '@/types';

interface NewEntryProps {
  isAdding: boolean;
  toggleAdding: () => void;
}

const NewEntry: React.FC<NewEntryProps> = ({ isAdding, toggleAdding }) => {
  const { dispatch } = useContext(EntriesContext);
  const [description, setDescription] = useState('');
  const [hasBeenTouched, setHasBeenTouched] = useState(false);

  const handleCancel = () => {
    toggleAdding();
    setDescription('');
    setHasBeenTouched(false);
  };

  const handleSave = async () => {
    const { data } = await baseEntriesApi.post<ENTRY_INTERFACE>('/entries', {
        body: {
          description,
        },
    });
    dispatch(addNewEntry(data));
    handleCancel();
  };

  return (
    <Box sx={{ marginBottom: 1 }}>
      {!isAdding ? (
        <Button
          variant='contained'
          fullWidth
          sx={{ marginBottom: 1 }}
          onClick={toggleAdding}
        >
          <AddCircleIcon />
        </Button>
      ) : (
        <>
          <TextField
            fullWidth
            multiline
            autoFocus
            value={description}
            onChange={({ target: { value } }) => setDescription(value)}
            error={description.length === 0 && hasBeenTouched}
            onBlur={() => setHasBeenTouched(true)}
          />
          <Box
            display='flex'
            justifyContent='end'
            sx={{ marginTop: 1 }}
            gap={1}
          >
            <Button
              color='error'
              variant='outlined'
              onClick={handleCancel}
            >
              <DeleteForeverIcon />
            </Button>
            <Button
              color='primary'
              variant='contained'
              onClick={handleSave}
              disabled={description.length === 0}
            >
              <SaveIcon />
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default NewEntry;
