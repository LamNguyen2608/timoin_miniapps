import React from 'react';
import { Grid } from '@mui/material';
type PersonalLayoutProps = {
  children: React.ReactNode;
};

const PersonalLayout: React.FC<PersonalLayoutProps> = ({ children }) => {
  return (
    <Grid container spacing={2}>
      {/* First part */}
      <Grid
        container
        item
        xs={12}
        style={{ backgroundColor: '#00F0F1' }}>
        {children && children[0 as keyof typeof children]}
      </Grid>

      {/* Second part */}
      <Grid item
        xs={12}
        container
        style={{ backgroundColor: '#F0F0F0' }}>
        <Grid item xs={4}>
          {children && children[1 as keyof typeof children]}
        </Grid>
        <Grid item xs={4}>
          {children && children[2 as keyof typeof children]}
        </Grid>
        <Grid item xs={4}>
          {children && children[3 as keyof typeof children]}
        </Grid>

        {/* Second smaller section */}
        <Grid item xs={6}>
          {/* Add fourth component here */}
        </Grid>
        <Grid item xs={6}>
          {/* Add fifth component here */}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PersonalLayout;
