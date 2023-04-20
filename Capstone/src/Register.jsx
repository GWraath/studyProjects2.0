import * as React from 'react';
import { useState } from 'react'
import axios from 'axios'
import { Button, TextField } from '@mui/material'
import { useNavigate } from "react-router-dom";

export default function Register() {

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
    if (PassWord !== RPassWord) {
      alert('Passwords must match!')
      window.location.reload();
    }
    else if (PassWord.length < 8) {
      alert('Passwords must have at least 8 characters')
      window.location.reload();
    }
    const newUser = { 'id': users.length + 1, 'FName': FName, 'LName': LName, 'UserName': UserName, 'PassWord': PassWord, 'UserAdmin': false }
    const axUsers = `http://localhost:8080/api/users/`
    console.log(axUsers)
    axios.post(axUsers, newUser)
      .then(response => { console.log(response); navigate('/'); });
  }

  return (
    <form>
      <div><label>First name</label></div>
      <TextField type="text" value={FName} onChange={e => setFName(e.target.value)}></TextField>
      <div><label>Last name</label></div>
      <TextField type='text' value={LName} onChange={e => setLName(e.target.value)}></TextField>
      <div><label>Username</label></div>
      <TextField type='text' value={UserName} onChange={e => setUserName(e.target.value)}></TextField>
      <div><label>Password</label></div>
      <TextField type='password' value={PassWord} onChange={e => setPassWord(e.target.value)}></TextField>
      <div><label>Repeat Password</label></div>
      <TextField type='password' value={RPassWord} onChange={e => setRPassWord(e.target.value)}></TextField>
      <div><Button onClick={newUser}>Register</Button></div>
    </form>

  );
}