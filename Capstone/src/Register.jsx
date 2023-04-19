import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import {useState} from 'react'
import axios from 'axios'
import { Button } from '@mui/material'
import { useNavigate } from "react-router-dom";

export default function Register() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#4A8E51'
      }
    },
  });
  const [FName, setFName] = useState('')
  const [LName, setLName] = useState('')
  const [UserName, setUserName] = useState('')
  const [PassWord, setPassWord] = useState('')
  const [RPassWord, setRPassWord] = useState('')
  const [users] = useState('')
  let navigate = useNavigate();

  //adds a new user
  const newUser = () => { 
      //if the passwords don't match, alert.
      if (PassWord!==RPassWord){
          alert('Passwords must match!')
      }
      const newUser={'id':users.length+1, 'FName':FName, 'LName':LName, 'UserName': UserName, 'PassWord': PassWord, 'UserAdmin': false}
      const axUsers=`http://localhost:8080/api/users/`
          console.log(axUsers)
          axios.post(axUsers, newUser)
          .then(response=> {console.log(response); navigate('/');});
    }


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
                        variant="h6"
                        align="center"
                        color="text.primary"
                        gutterBottom
                        >
                        <form>
                            <div><label>First name</label></div>
                            <TextField type="text" value={FName} onChange={e=>setFName(e.target.value)}></TextField>
                            <div><label>Last name</label></div>
                            <TextField type='text' value={LName} onChange={e=>setLName(e.target.value)}></TextField>
                            <div><label>Username</label></div>
                            <TextField type='text' value={UserName} onChange={e=>setUserName(e.target.value)}></TextField>
                            <div><label>Password</label></div>
                            <TextField type='password' value={PassWord} onChange={e=>setPassWord(e.target.value)}></TextField>
                            <div><label>Repeat Password</label></div>
                            <TextField type='password' value={RPassWord} onChange={e=>setRPassWord(e.target.value)}></TextField>
                            <div><Button onClick={newUser}>Register</Button></div>
                        </form>
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