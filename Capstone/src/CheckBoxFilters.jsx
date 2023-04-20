import React from 'react'
import { FormControlLabel, FormGroup, Checkbox } from '@mui/material'
import { useContext, useState, useEffect } from 'react'
import { PlantContext } from './App'
import axios from 'axios'

export default function CheckBoxFilters(props) {
    const cvalues = props.value
    const { setPlants } = useContext(PlantContext);
    const [propArray, setPropArray] = useState([])

    const manageArray = (prop) => {
        const newArray = propArray.indexOf(prop) > -1 ? propArray.filter((remove) => remove !== prop) : [...propArray, prop]
        setPropArray(newArray)
    }

    useEffect(() => {
        const setPlantArray =  () => {
            // const axPlants = `http://localhost:8080/api/plants/search/${props.filterType}/${prop}`
            const axPlants = `http://localhost:8080/api/plants/search/${props.filterType}/${propArray}`
            // const axPlants=`http://localhost:8080/api/plants/search/${props.filterType}/B6`

            console.log(axPlants)
            axios.get(axPlants)
                .then(response => { console.log(response); setPlants(response.data) })
                .catch(error => { console.log(error) })
            // }
        }
        setPlantArray();
    }, [propArray]); // automatically re-fetches whenever propArray changes

    console.log(propArray)
    return (
        <FormGroup>
            <div>{
                cvalues && cvalues.length ?
                    cvalues.map((prop, index) => (
                        <FormControlLabel control={<Checkbox {...prop} />} label={prop} key={index} onClick={() => manageArray(prop)} />
                        // <FormControlLabel control={<Checkbox {...prop} />} label={prop} key={prop} onClick={() => createArray(prop)} />
                        // <FormControlLabel control={<Checkbox {...prop} />} checked={checked} onChange={handleChange} label={prop} key={index} onClick={() => createArray(prop)} />
                    )) : null}</div>
        </FormGroup>
    )
}
