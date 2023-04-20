import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, TextField } from '@mui/material'
import { useNavigate } from "react-router-dom";

export const PlantNew = () => {
    const [plant, setPlant] = useState([]);
    const [newPlant, setNewPlant] = useState(false);
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);
    let navigate = useNavigate();

    //if a non user is trying to gain access, this will stop it.
    const doNotProceed = () => {
        console.log(currentUser)
        if (currentUser === null) {
            navigate('/pna');
        }
    }
    doNotProceed()

    //gets the plants
    useEffect(() => {
        console.log(`Fetching plants`)
        axios.get('http://localhost:8080/api/plants/')
            .then(response => { console.log(response.data); setPlant(response.data[0]); })
            .catch(error => { console.log(error) })
    }, [newPlant])

    const [CName, setCName] = useState('')
    const [LName, setLName] = useState('')
    const [Vitamins, setVitamins] = useState('')
    const [Minerals, setMinerals] = useState('')
    const [PharmaProps, setPharmaProps] = useState('')
    const [imgUrl, setImgURL] = useState('')
    const [desc, SetDesc] = useState('')

    //adds a plant
    const plantAdd = () => {
        const newPlant = { 'id': plant.length + 1, 'PlantIMGURL': imgUrl, 'PlantCName': CName, 'PlantLName': LName, 'PlantVitamins': Vitamins, 'PlantMinerals': Minerals, 'PlantPharmaProps': PharmaProps, 'PlantDesc': desc }
        const axPlants = `http://localhost:8080/api/plants/`
        console.log(axPlants)
        axios.post(axPlants, newPlant)
            .then(response => { console.log(response); setNewPlant(response.data) })
            .catch(error => { console.log(error) });
        navigate('/');
    }
    return (
        <div className="plantInfo">
            {/* <img alt='plant' width={400} height={400} src={imgUrl}></img> */}
            Add a plant
            <form>
            <br></br><div><TextField type='text' onChange={e => setImgURL(e.target.value)} label="Image URL"></TextField></div><br></br>
                <div><TextField type='text' onChange={e => setCName(e.target.value)} label="Common name"></TextField></div><br></br>
                <div><TextField type='text' onChange={e => setLName(e.target.value)} label="Latin name"></TextField></div><br></br>
                <div><TextField type='text' onChange={e => setVitamins(e.target.value)} label="Vitamins"></TextField></div><br></br>
                <div><TextField type='text' onChange={e => setMinerals(e.target.value)} label="Minerals"></TextField></div><br></br>
                <div><TextField type='text' onChange={e => setPharmaProps(e.target.value)} label="Pharma properties"></TextField></div><br></br>
                <div><TextField type='text' onChange={e => SetDesc(e.target.value)} label="Description"></TextField></div>
                <Button onClick={plantAdd}>Add</Button>
            </form>
        </div>
    )
}
