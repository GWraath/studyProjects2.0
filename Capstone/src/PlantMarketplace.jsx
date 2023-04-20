import * as React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid,
  Box, Typography, Container, Link} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import PlantPages from './PlantPages';
import {PlantContext, PlantLikeContext} from './App';
import {PageTypeContext} from './App'
import DropDownVar from './DropDownVar';
import { useNavigate } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


// const cards = [response];

const theme = createTheme({
  palette: {
    primary: {
      main: '#4A8E51'
    }
  },
});

export default function PlantMarketplace() {
  const {setPageType} = useContext(PageTypeContext);
  const {plants, setPlants} = useContext(PlantContext);
  const {plantLike, setPlantLike} = useContext(PlantLikeContext)
  const [page, setPage] = useState(1);
  const [plantList, setPlantList] = useState(0)
  const [deleted, setDeleted] = useState(false)
  const plantsPerPage = 6;
  const currentUserString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserString);
  let navigate = useNavigate();

  //get the plants
  useEffect(()=> {
      setPageType('plants')
      const offset = plantsPerPage * (page-1)
      const axPlants=`http://localhost:8080/api/plants?limit=${plantsPerPage}&offset=${offset}`
      console.log(axPlants)
      axios.get(axPlants)
      .then(response=> {console.log(response); setPlants(response.data)})
      .catch(error => {console.log(error)})
      },[page, deleted])
  
      useEffect(()=> {
        axios.get(`http://localhost:8080/api/plants`)
        .then(response=> {console.log(response); setPlantList(response.data)})
        .catch(error => {console.log(error)})
        },[])
  
  //delete a plant
  const plantDelete = (delplantid) => {
    doNotProceed()
    const axPlants=`http://localhost:8080/api/plants/`+delplantid
        console.log(axPlants)
        axios.delete(axPlants)
        .then(response=> {console.log(response); setDeleted(true)})
        .catch(error => {console.log(error)})
  }

    //Manages a like
    const plantLikeSetter = (plantid) => {
      console.log(plantLike)
      doNotProceed()
      if (plantLike===1) {
        const axPlants=`http://localhost:8080/api/plants/like/`+plantid
        const updatePlant={'id':plantid,'PlantLike':plantLike}
          console.log(axPlants)
          axios.put(axPlants, updatePlant)
          .then(response=> {console.log(response); setPlantLike(0);})
          .catch(error => {console.log(error)})
      }
      else {
        const axPlants=`http://localhost:8080/api/plants/like/`+plantid
        const updatePlant={'id':plantid,'PlantLike':plantLike}
          console.log(axPlants, updatePlant)
          axios.put(axPlants, updatePlant)
          .then(response=> {console.log(response); setPlantLike(1);})
          .catch(error => {console.log(error)})
      }
    }

  //if non user clicks delete, redirect to pna
  const doNotProceed = () => {
    console.log(currentUser)
    if (currentUser===null){
        navigate('/pna');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Typography
            component="h1"
            variant="h6"
            align="center"
            color="text.primary"
            gutterBottom
            >
            This website contains many medicinal plants. We recommend that you use this information in conjunction with your doctor or nutritionalist.
          {currentUser ? <div><Button variant="outlined" id="buttonWhite" size="small" href={"/plantnew/"}>List a plant</Button></div> : null}
          </Typography>
          <Typography variant="h6" id="toolDrop">
          <DropDownVar/><br></br>
            </Typography>
          <Grid container spacing={4}>
            {plants.map((plant, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      // pt: '56.25%',
                    }}
                    image={plant.PlantIMGURL}
                    alt="random"
                    height="300"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" className='capitalise'>
                      {plant.PlantCName}
                    </Typography>
                    <Typography>
                      {plant.PlantLName}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href={"/plantinfo/"+(plant.id)}>View</Button>
                    {currentUser ? <Button size="small" href={"/plantinfoedit/"+(plant.id)}>Edit</Button> : null}
                    {currentUser ? <Button size="small" onClick={()=>{plantDelete(plant.id)}}>Delete</Button> : null}
                    {plant.PlantLike ? <Button size="small" onClick={()=>{plantLikeSetter(plant.id)}}>Unlike</Button> : <Button size="small" onClick={()=>{plantLikeSetter(plant.id)}}>Like</Button>}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
        <PlantPages pageHandler={setPage} list={plantList.length}/>
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Choose a page to explore more!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}