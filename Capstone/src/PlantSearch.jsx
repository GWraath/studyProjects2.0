import React from 'react'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import TextField from '@mui/material/TextField';
import {PlantContext} from './App'
import {PageTypeContext} from './App'
import {UsersContext} from './App'
import PlantHome from './PlantHome';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function PlantSearch() {
  let [query, setQuery] = useState()
  let [textField, setTextField] = useState()
  const {setPlants} = useContext(PlantContext);
  const {setUsers} = useContext(UsersContext);
  const {pageType} = useContext(PageTypeContext);

  //sets the theme
  const theme = createTheme({
    palette: {
      primary: {
        main: '#4A8E51'
      }
    },
  }
  );
  //gets plants is page is plant. gets users if page is user.
  useEffect(()=> {
    if(pageType==='plants'){ 
      if (query){
      const axPlants=`http://localhost:8080/api/plants/search/${query}`
      console.log(axPlants)
      axios.get(axPlants)
      .then(response=> {console.log(response); setPlants(response.data)})
      .catch(error => {console.log(error)})}}
    else if (pageType==='users'){
      if (query){
        const axUsers=`http://localhost:8080/api/users/search/${query}`
        console.log(axUsers)
        axios.get(axUsers)
        .then(response=> {console.log(response); setUsers(response.data)})
        .catch(error => {console.log(error)})}}
    else if (query===undefined) {<PlantHome/>}
    },[query])
  
  //if the textfield is empty and button is pushed, reloads the screen. if not, sets the query with input.
  const setTheQuery = () => {
    console.log(textField)
    setQuery(textField)
    if (textField==='') {
      window.location.reload()
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <div><TextField InputLabelProps={{style: { color: '#4A8E51', borderColor: '#4A8E51'}}}  label="search" variant='filled' type="text" onChange={(e)=>setTextField(e.target.value)}/><Button id="searchButton" onClick={()=>setTheQuery()}><SearchIcon sx={{ mr: 2 }} /></Button></div>
    </ThemeProvider>
  )
}