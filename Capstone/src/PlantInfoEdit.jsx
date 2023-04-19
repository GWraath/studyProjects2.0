import React from 'react'
import {useParams} from 'react-router-dom'
import { useEffect, useState} from 'react'
import axios from 'axios'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

export const PlantInfoEdit = () => {
    const params = useParams();
    const plantid = params.planteditid
    // state and useeffect

    const [plant, setPlant] = useState([]);
    const [updated, setUpdated] = useState(false);
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);
    let navigate = useNavigate();
    
    //if a non user is trying to gain access, this will stop it.
    const doNotProceed = () => {
        console.log(currentUser)
        if (currentUser===null){
            navigate('/pna');
        }
      }
    doNotProceed()

    //gets plant information
    useEffect(()=> {
        console.log(`Fetching ${plant.PlantCName} information`)
        axios.get('http://localhost:8080/api/plants/'+plantid)
        .then(response=> {console.log(response.data); setPlant(response.data[0]);})
        .catch(error => {console.log(error)})
        },[plantid, updated])

    const [CName, setCName] = useState('')
    const [LName, setLName] = useState('')
    const [Vitamins, setVitamins] = useState('')
    const [Minerals, setMinerals] = useState('')
    const [PharmaProps, setPharmaProps] = useState('')
    const [imgUrl, setImgURL] = useState('')
    const [desc, SetDesc] = useState('')
    
    //updates the plant
    const plantUpdate = () => {
        const updatePlant={'id':plantid,'PlantIMGURL':imgUrl, 'PlantCName':CName, 'PlantLName':LName, 'PlantVitamins': Vitamins, 'PlantMinerals': Minerals, 'PlantPharmaProps': PharmaProps, 'PlantDesc': desc}
        const axPlants=`http://localhost:8080/api/plants/`+plantid
            console.log(axPlants)
            axios.put(axPlants, updatePlant)
            .then(response=> {console.log(response); setUpdated(response.data)})
            .catch(error => {console.log(error)});
            navigate('/');
        }
    return (
        <div className="plantInfo"> 
            {plant.PlantCName ?
            <>
            <h3>{plant.PlantCName}</h3>
            <img alt='plant' width={400} height={400}  src={plant.PlantIMGURL}></img>
            <form>
            <div><TextField type='text' onChange={e=>setImgURL(e.target.value)} defaultValue={plant.PlantIMGURL} label="Image URL"></TextField></div>
            <div><TextField type='text' onChange={e=>setCName(e.target.value)} defaultValue={plant.PlantCName} label="Common name"></TextField></div> 
            <div><TextField type='text' onChange={e=>setLName(e.target.value)} defaultValue={plant.PlantLName} label="Latin name"></TextField></div>
            <div><TextField type='text' onChange={e=>setVitamins(e.target.value)} defaultValue={plant.PlantVitamins} label="Vitamins"></TextField></div>
            <div><TextField type='text' onChange={e=>setMinerals(e.target.value)} defaultValue={plant.PlantMinerals} label="Minerals"></TextField></div>
            <div><TextField type='text' onChange={e=>setPharmaProps(e.target.value)} defaultValue={plant.PlantPharmaProps} label="Pharma properties"></TextField></div>
            <div><TextField type='text' onChange={e=>SetDesc(e.target.value)} defaultValue={plant.PlantDesc} label="Description"></TextField></div>
            <Button onClick={plantUpdate}>Update</Button>
            </form>
            </>
            : <p> Plant: {plantid} not found</p>
            }
        </div>              
    )
}
