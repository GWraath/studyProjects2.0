import React from 'react'
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

export const UserInfoEdit = () => {
    const [FName, setFName] = useState('')
    const [LName, setLName] = useState('')
    const [UserName, setUserName] = useState('')
    const [PassWord, setPassWord] = useState('')
    const [UserAdmin, setUserAdmin] = useState('')

    const params = useParams();
    const userid = params.usereditid
    // state and useeffect

    const [user, setUser] = useState({});
    const [updated, setUpdated] = useState(false);
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);
    let navigate = useNavigate();

    //if a non admin is trying to gain access, this will stop it.
    const doNotProceed = () => {
        console.log(currentUser)
        if (currentUser===null || currentUser.UserAdmin===0){
            navigate('/pna');
        }
      }
    //description field - make more user friendly
    doNotProceed()
    
    //gets users
    useEffect(()=> {
        console.log(`Fetching ${userid} information`)
        axios.get('http://localhost:8080/api/users/'+userid)
        .then(response=> {console.log(response.data); setUser(response.data[0]);})
        .catch(error => {console.log(error)})
        },[userid, updated])
    
    //updates the users
    const userUpdate = () => {
        console.log(userid)
        const updateUser={'id':userid, 'FName':FName, 'LName':LName, 'UserName': UserName, 'PassWord': PassWord, 'UserAdmin': UserAdmin}
        const axUsers=`http://localhost:8080/api/users/`+userid
            console.log(axUsers)
            axios.put(axUsers, updateUser)
            .then(response=> {console.log(response); setUpdated(response.data); navigate('/users');})
            .catch(error => {console.log(error)});
        }
    return (
        <div className="userInfo">{console.log(user)}
            {userid ?
            <>
            <h3>{userid}</h3>
            <img alt='user' width={400} height={400}  src={'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}></img>
            <form>
            <div><TextField type='text' key={user.FName} onChange={e=>setFName(e.target.value)} defaultValue={user.FName} label="First Name"></TextField></div>
            <div><TextField type='text' key={user.LName} onChange={e=>setLName(e.target.value)} defaultValue={user.LName} label="Last Name"></TextField></div>
            <div><TextField type='text' key={user.UserName} onChange={e=>setUserName(e.target.value)} defaultValue={user.UserName} label="Username"></TextField></div>
            <div><TextField type='password' key={user.PassWord} onChange={e=>setPassWord(e.target.value)} defaultValue={user.PassWord} label="Password"></TextField></div>
            <div><TextField type='text' key={user.UserAdmin} onChange={e=>setUserAdmin(e.target.value)} defaultValue={user.UserAdmin} label="Admin"></TextField></div>
            <Button onClick={userUpdate}>Update</Button>
            </form>
            </>
            : <p> User: {userid} not found</p>
            }
        </div>              
    )
}
