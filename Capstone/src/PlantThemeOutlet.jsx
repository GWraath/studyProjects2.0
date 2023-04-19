import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {Outlet} from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//sets the theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#4A8E51'
    }
  },
}
);

export default function PlantThemeOutlet() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
                >
                    <Container maxWidth="sm">
                        <Typography
                        component="h1"
                        variant="p"
                        align="center"
                        color="text.primary"
                        gutterBottom
                        >
                          <Outlet />
                        </Typography>
                    </Container>
                </Box>
            </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}