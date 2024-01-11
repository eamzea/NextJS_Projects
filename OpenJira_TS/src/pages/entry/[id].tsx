import { useContext, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Layout } from '@/components';
import { ENTRY_STATUS } from '@/utils/constants';
import { ENTRY_INTERFACE, ENTRY_STATUS_TYPE } from '@/types';
import { getEntryById } from '@/utils/dbConnection';
import baseEntriesApi from '@/api/entries';
import { Context, deleteEntry, updateEntryStatus } from '@/context/entries';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { getTimeFromNow } from '@/utils/dates';

interface EntryPageProps {
  entry: ENTRY_INTERFACE;
}

const EntryPage: NextPage<EntryPageProps> = ({ entry }) => {
  const [description, setDescription] = useState(entry.description);
  const [status, setStatus] = useState<ENTRY_STATUS_TYPE>(entry.status);
  const { dispatch } = useContext(Context);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleSave = async () => {
    const { data } = await baseEntriesApi.put<ENTRY_INTERFACE>(`/entries/${entry._id}`, {
      description,
      status,
    });

    dispatch(updateEntryStatus(data));
    enqueueSnackbar('Entry updated successfully', {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
    router.push('/');
  };

  const handleDelete = async () => {
    await baseEntriesApi.delete<ENTRY_INTERFACE>(`/entries/${entry._id}`);
    dispatch(deleteEntry(entry._id));
    enqueueSnackbar('Entry deleted successfully', {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
    router.push('/');
  };

  return (
    <Layout title={entry.description}>
      <Grid
        container
        justifyContent='center'
        sx={{ marginTop: 2 }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
        >
          <Card>
            <CardHeader
              title={`Entry: ${entry.description}`}
              subheader={`Created ${getTimeFromNow(entry.createdAt)}`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                onChange={({ target: { value } }) => setDescription(value)}
                multiline
                placeholder='New Entry'
                autoFocus
                value={description}
              />
              <FormControl>
                <FormLabel>Status:</FormLabel>
                <RadioGroup
                  row
                  value={status}
                  onChange={({ target: { value } }) => setStatus(value as ENTRY_STATUS_TYPE)}
                >
                  {ENTRY_STATUS.map(option => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions sx={{ paddingX: 2 }}>
              <Button
                color='primary'
                variant='contained'
                fullWidth
                onClick={handleSave}
                disabled={description.length === 0}
              >
                <SaveIcon />
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{ position: 'fixed', bottom: 30, right: 30, backgroundColor: 'error.dark' }}
        onClick={handleDelete}
      >
        <DeleteForeverIcon />
      </IconButton>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry: JSON.parse(JSON.stringify(entry)),
    },
  };
};

export default EntryPage;
