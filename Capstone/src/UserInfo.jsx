import React from 'react'
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {Button} from '@mui/material/';
import { useNavigate } from "react-router-dom";
import usePlantLogic from './usePlantLogic';

export const PlantUserInfo = () => {
    const params = useParams();
    const userid = params.userid
    // state and useeffect

    const [state, dispatch] = usePlantLogic()

    const [user, setUser] = useState([]);
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);
    let navigate = useNavigate();

    const doNotProceed = () => {
        console.log(currentUser)
        if (currentUser===null || currentUser.UserAdmin===0){
            navigate('/pna');
        }
      }
    //description field - make more user friendly
    doNotProceed()
    
    //gets the users
    useEffect(()=> {
        console.log('Fetching user information')
        axios.get('http://localhost:8080/api/users/'+userid)
        .then(response=> {console.log(response.data); setUser(response.data[0]);})
        .catch(error => {console.log(error)})
        },[userid])

    const FName = <div><b>First name:</b><br></br> {user.FName}</div>
    const LName = <div><b>Last Name:</b><br></br> {user.LName}</div>
    const UserName = <div><b>Username:</b><br></br> {user.UserName}</div>
    const PassWord = <div><b>Password:</b><br></br> {user.PassWord}</div>
    const UserAdmin = <div><b>Admin: </b><br></br> {user.UserAdmin}</div>

    return (
        <div className="userInfo">
        {user.id ?
        <>
        <h3>{user.id}</h3>
        <img alt='plant' width={400} height={400}  src={'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}></img>
        <div><Button variant="contained" onClick={()=> dispatch({type: 'hideOrShow'})}>{state? 'Show User Information':'Hide User Information'}</Button></div> <br></br>
        {!state ? FName : null} <br></br>
        {!state ? LName : null}<br></br>
        {!state ? UserName : null}<br></br>
        {!state ? PassWord : null}<br></br>
        {!state ? UserAdmin : null}
        </>
        : <p> User: {user.id} not found</p>
        }
    </div>             
    )
}
