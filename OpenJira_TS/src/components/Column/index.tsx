import { useState } from 'react';
import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import List from '../List';
import { ENTRY_STATUS_TYPE } from '@/types';
import NewEntry from '../NewEntry';

interface ColumnProps {
  title: string;
}

const Column: React.FC<ColumnProps> = ({ title }) => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <Grid
      item
      xs={4}
    >
      <Card sx={{ height: 'calc(100vh - 5rem)' }}>
        <CardHeader
          title={{ done: 'Done', 'in-progress': 'In Progress', pending: 'Pending' }[title]}
        />
        <CardContent>
          {title === 'pending' && (
            <NewEntry
              isAdding={isAdding}
              toggleAdding={() => setIsAdding(!isAdding)}
            />
          )}
          <List status={title as ENTRY_STATUS_TYPE} isAdding={isAdding} />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Column;
