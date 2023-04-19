import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";

export const PlantNew = () => {
    const [plant, setPlant] = useState([]);
    const [newPlant, setNewPlant] = useState(false);
    let navigate = useNavigate();

    //gets the plants
    useEffect(()=> {
        console.log(`Fetching plants`)
        axios.get('http://localhost:8080/api/plants/')
        .then(response=> {console.log(response.data); setPlant(response.data[0]);})
        .catch(error => {console.log(error)})
        },[newPlant])

    const [CName, setCName] = useState('')
    const [LName, setLName] = useState('')
    const [Vitamins, setVitamins] = useState('')
    const [Minerals, setMinerals] = useState('')
    const [PharmaProps, setPharmaProps] = useState('')
    const [imgUrl, setImgURL] = useState('')
    const [desc, SetDesc] = useState('')

    //adds a plant
    const plantAdd = () => {
        const newPlant={'id':plant.length+1, 'PlantIMGURL':imgUrl, 'PlantCName':CName, 'PlantLName':LName, 'PlantVitamins': Vitamins, 'PlantMinerals': Minerals, 'PlantPharmaProps': PharmaProps, 'PlantDesc': desc}
        const axPlants=`http://localhost:8080/api/plants/`
            console.log(axPlants)
            axios.post(axPlants, newPlant)
            .then(response=> {console.log(response); setNewPlant(response.data)})
            .catch(error => {console.log(error)});
            navigate('/');
        }
    return (
        <>
        <Container maxWidth="sm">
            <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            >
                <div className="plantInfo">
                <img alt='plant' width={400} height={400}  src={imgUrl}></img>
                <form>
                    <div><TextField type='text' onChange={e=>setImgURL(e.target.value)} label="Image URL"></TextField></div>
                    <div><TextField type='text' onChange={e=>setCName(e.target.value)} label="Common name"></TextField></div> 
                    <div><TextField type='text' onChange={e=>setLName(e.target.value)} label="Latin name"></TextField></div>
                    <div><TextField type='text' onChange={e=>setVitamins(e.target.value)} label="Vitamins"></TextField></div>
                    <div><TextField type='text' onChange={e=>setMinerals(e.target.value)} label="Minerals"></TextField></div>
                    <div><TextField type='text' onChange={e=>setPharmaProps(e.target.value)} label="Pharma properties"></TextField></div>
                    <div><TextField type='text' onChange={e=>SetDesc(e.target.value)} label="Description"></TextField></div>
                    <Button onClick={plantAdd}>Add</Button>
                </form>
                </div>  
            </Typography>
        </Container>
        </>            
    )
}
