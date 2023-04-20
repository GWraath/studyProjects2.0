import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, TextField } from '@mui/material'
import { useNavigate } from "react-router-dom";

export const UserNew = () => {
    const [user, setUser] = useState([]);
    const [newUser, setNewUser] = useState(false);
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);
    let navigate = useNavigate();

    const [FName, setFName] = useState('')
    const [LName, setLName] = useState('')
    const [UserName, setUserName] = useState('')
    const [PassWord, setPassWord] = useState('')
    const [UserAdmin, setUserAdmin] = useState('')

    //if a non admin is trying to gain access, this will stop it.
  const doNotProceed = () => {
    console.log(currentUser)
    if (currentUser===null || currentUser.UserAdmin===0){
        navigate('/pna');
        }
      }
  doNotProceed()

    //gets users
    useEffect(() => {
        console.log(`Fetching users`)
        axios.get('http://localhost:8080/api/users/')
            .then(response => { console.log(response.data); setUser(response.data[0]); })
            .catch(error => { console.log(error) })
    }, [newUser])

    //adds a new user
    const userAdd = () => {
        const newUser = { 'id': user.length + 1, 'Fname': FName, 'LName': LName, 'UserName': UserName, 'PassWord': PassWord }
        const axPlants = `http://localhost:8080/api/users/`
        console.log(axPlants)
        axios.post(axPlants, newUser)
            .then(response => { console.log(response); setNewUser(response.data) })
            .catch(error => { console.log(error) });
        navigate('/');
    }
    return (
        <>
            <div className="plantInfo">
                <img alt='user' width={400} height={400} src={'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}></img>
                <form>
                    <div><TextField type='text' value={FName} onChange={e => setFName(e.target.value)} defaultValue={user.FName} label="First Name"></TextField></div>
                    <div><TextField type='text' value={LName} onChange={e => setLName(e.target.value)} defaultValue={user.LName} label="Last Name"></TextField></div>
                    <div><TextField type='text' value={UserName} onChange={e => setUserName(e.target.value)} defaultValue={user.UserName} label="Username"></TextField></div>
                    <div><TextField type='password' value={PassWord} onChange={e => setPassWord(e.target.value)} defaultValue={user.PassWord} label="Password"></TextField></div>
                    <div><TextField type='text' value={UserAdmin} onChange={e => setUserAdmin(e.target.value)} defaultValue={user.UserAdmin} label="Admin"></TextField></div>
                    <Button variant="outlined" id="buttonWhite" onClick={userAdd}>Add</Button>
                </form>
            </div>
        </>
    )
}
