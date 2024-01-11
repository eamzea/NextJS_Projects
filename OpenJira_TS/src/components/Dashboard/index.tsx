import { Grid } from '@mui/material';
import Column from '../Column';

const Dashboard = () => {
  return (
    <Grid
      container
      spacing={2}
    >
      {['pending', 'in-progress', 'done'].map(col => (
        <Column
          title={col}
          key={col}
        />
      ))}
    </Grid>
  );
};

export default Dashboard;
