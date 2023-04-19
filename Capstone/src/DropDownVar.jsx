import React from 'react'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CheckBoxFilters from './CheckBoxFilters';
import { useState } from "react";
import axios from 'axios'


export default function DropDownVar() {
    const [searchType, setSearchType] = useState('')
    const [checkBoxFilters, setCheckBoxFilters] = useState([])

    //gets all plants, grabs etv,  determines which checkbox to populate for CBF.
    const handleChange = (event) =>{
      const newSearchType = event.target.value
      setSearchType(newSearchType);
      console.log(newSearchType)
      const axPlants=`http://localhost:8080/api/plants/`+newSearchType
      console.log(axPlants)
      axios.get(axPlants)
      .then(response=> {console.log(response); setCheckBoxFilters(response.data)})
      .catch(error => {console.log(error)})
    }
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Refine</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={searchType}
          label="Refine"
          onChange={handleChange}
        >
          <MenuItem value='Vit'>Vitamins</MenuItem>
          <MenuItem value='Min'>Minerals</MenuItem>
          <MenuItem value='Pharma'>Pharmacutical</MenuItem>
        </Select>
      </FormControl>
     <CheckBoxFilters value={checkBoxFilters} filterType={searchType}/>
  </div>
  )
}
