import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, TextField } from '@mui/material'
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  let navigate = useNavigate();

  const currentUserString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserString);
  // state and useeffect

  const [user, setUser] = useState([]);
  const [updated, setUpdated] = useState(false);

  //gets user profile
  useEffect(() => {
    console.log(`Fetching ${currentUser}'s information`)
    axios.get('http://localhost:8080/api/users/' + currentUser.id)
      .then(response => { console.log(response.data); setUser(response.data[0]); })
      .catch(error => { console.log(error) })
  }, [currentUser.id, updated])

  const [FName, setFName] = useState('')
  const [LName, setLName] = useState('')
  const [UserName, setUserName] = useState('')
  const [PassWord, setPassWord] = useState('')
  const [UserAdmin, setUserAdmin] = useState('')

  //updates a user
  const userUpdate = () => {
    console.log(currentUser)
    const updateUser = { 'id': currentUser.id, 'FName': FName, 'LName': LName, 'UserName': UserName, 'PassWord': PassWord, 'UserAdmin': UserAdmin }
    const axUsers = `http://localhost:8080/api/users/` + currentUser
    console.log(axUsers)
    axios.put(axUsers, updateUser)
      .then(response => { console.log(response); setUpdated(response.data) })
      .catch(error => { console.log(error) });
  }

  //logs user out
  const loggingOff = () => {
    // setCurrentUser('')
    localStorage.removeItem('currentUser');
    navigate('/');
  }
  return (
  <>
    <Button onClick={loggingOff}>Log out</Button>
    <div className="userInfo">
      {currentUser.id ?
        <>
          <h3>{currentUser.UserName}</h3>
          <img alt='user' width={400} height={400} src={'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}></img>
          <form>
            <div><TextField type='text' onChange={e => setFName(e.target.value)} defaultValue={currentUser.FName} label="First Name"></TextField></div><br></br>
            <div><TextField type='text' onChange={e => setLName(e.target.value)} defaultValue={currentUser.LName} label="Last Name"></TextField></div><br></br>
            <div><TextField type='text' onChange={e => setUserName(e.target.value)} defaultValue={currentUser.UserName} label="Username"></TextField></div><br></br>
            <div><TextField type='password' onChange={e => setPassWord(e.target.value)} defaultValue={currentUser.PassWord} label="Password"></TextField></div><br></br>
            <Button onClick={userUpdate}>Update</Button>
          </form>
        </>
        : <p> User: {currentUser.id} not found</p>
      }
    </div>
  </>
  )
}
