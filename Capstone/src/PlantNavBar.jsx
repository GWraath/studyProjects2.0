import React from 'react'
import {NavLink} from 'react-router-dom'
import { AppBar, Toolbar, Typography } from '@mui/material'
import PlantSearch from './PlantSearch';



const Navbar=()=> {
  const users = <NavLink id="link" to='/users'>Users</NavLink>
  //gets the logged in user
  const currentUserString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserString);

  return (
    <>
    <AppBar position="sticky" className='AppBar' sx={{backgroundColor: '#4A8E51'}}>
      <Typography variant="h3" id="plantica">
        Plantica
      </Typography>
      <Toolbar id="tool">          
        <Typography variant="h6" color="inherit" noWrap id="toolItems">
          <NavLink id="link" to='/'>Home</NavLink>
          <NavLink id="link" to='/market'>Market</NavLink>
          {currentUser && currentUser.UserAdmin ? users : null}
          {currentUser ? <NavLink id="link" to='/profile'>{currentUser.UserName}</NavLink> : <NavLink id="link" to='/login' >Login</NavLink>}
          {currentUser ? <NavLink id="link" to='/chat'>Chat</NavLink> : null}
        </Typography>
      </Toolbar>
      <Typography variant="h6" id="toolSearch">
        <PlantSearch/>
      </Typography>
    </AppBar>
    </>
  )
}

export default Navbar