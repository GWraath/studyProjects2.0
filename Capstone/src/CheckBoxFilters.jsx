import React from 'react'
import { FormControlLabel, FormGroup } from '@mui/material'
import { useContext, useState } from 'react'
import { Checkbox } from '@mui/material'
import { PlantContext } from './App'
import axios from 'axios'

export default function CheckBoxFilters(props) {
    const cvalues = props.value
    const { setPlants } = useContext(PlantContext);
    const [propArray, setPropArray] = useState([])

    //adds the props od newSearchType as props.filterType / the search query
    const createArray = (prop) => {
        propArray.length === 0 ? setPropArray([prop]) : manageArray(prop)
    }

    const manageArray = (prop) => {
        const propToRemove = prop
        const newArray = [...propArray, prop]
        propArray.indexOf(prop) > -1 ? removeFromArray(propToRemove) : setPropArray(newArray)
        setPlantArray()
    }

    const removeFromArray = (propToRemove) => {
        setPropArray(propArray.filter((remove) => remove !== propToRemove))
    }

    const setPlantArray =  () => {
        // const axPlants = `http://localhost:8080/api/plants/search/${props.filterType}/${prop}`
        const axPlants = `http://localhost:8080/api/plants/search/${props.filterType}/${propArray}`
        // const axPlants=`http://localhost:8080/api/plants/search/${props.filterType}/B6`
        axios.get(axPlants)
            .then(response => { console.log(response); setPlants(response.data) })
            .catch(error => { console.log(error) })
        // }
    }
    console.log(propArray)
    return (
        <FormGroup>
            <div>{
                cvalues && cvalues.length ?
                    cvalues.map((prop, index) => (
                        <FormControlLabel control={<Checkbox {...prop} />} label={prop} key={index} onClick={() => createArray(prop)} />
                    )) : null}</div>
        </FormGroup>
    )
}
