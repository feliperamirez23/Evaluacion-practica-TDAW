import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react'
import './App.css';
import axios from "axios";
import { LoremIpsum } from 'lorem-ipsum';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CircularProgress,
  Grid,
  List,
  ListItem,
  TextField,
  Tooltip,
} from "@mui/material";



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ExpandMore2 = styled((props) => {
  const { expand2, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand2 }) => ({
  transform: !expand2 ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


function useLoadingMessage() {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [isLoading]);

  return [isLoading, setLoading];
}


function App() {
  

  const [dog,setDog] = useState({
    nombre: "",
    imagen: "",
    descripcion: "",
    
  });
  const [isLoading, setLoading] = useLoadingMessage();
  const [rDog, setRDog] = useState ([]);
  const [aDog, setADog] = useState ([]);
  const [btnDis, setbtnDis] = useState(false);
  const lorem = new LoremIpsum();


  const cardStyle ={
    widht: '250px',
    height: 'flex',
    margin: '0px',
  };


  const getDog=()=> {
    setbtnDis(true);
    setLoading(true);
    const texto = lorem.generateParagraphs(1);
    let res = '';
    for(let i = 0; i < 6; i++){
        const random = Math.floor(Math.random() * 25);
        res += String.fromCharCode(97 + random);
    };
    axios.get('https://dog.ceo/api/breeds/image/random')
    .then((response) => {
      setDog 
      ({
          nombre: res,
          imagen: response.data.message,
          descripcion: texto,
      });
    }) 
    setTimeout(()=>{
      setbtnDis(false);
    },2000);


  };

  useEffect(()=>{
    getDog();

  }, []);

  const rechazadoDog=(dog)=>{
    setRDog([...rDog,dog]);
    getDog();
  };

  const aceptadoDog=(dog)=>{
    setADog([...aDog,dog]);
    getDog();
  };

  const arrepentidoR=(dog)=>{
    setRDog(rDog.filter((d)=>d!==dog));
    setADog([...aDog,dog]);
  };

  const arrepentidoA=(dog)=>{
    setADog(aDog.filter((d)=>d!==dog));
    setRDog([...rDog,dog]);
  };

 const [expanded, setExpanded] = React.useState(false);
 const [expanded2, setExpanded2] = React.useState(false);

const handleExpandClick = () => {
  setExpanded(!expanded);
};

const handleExpandClick2 = () => {
  setExpanded2(!expanded2);
};


  return (

    <Box className="box">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={1}
      >
        <div className="App">
          <div className="left">
            {
             <div className="perrosL"> <center>Perritos Candidatos</center>
             {isLoading && <center><p><CircularProgress/></p></center>} 
             <Grid item md={50} xs={50} sx={{ background: "gray"   }}>
               <Card classname="card" style={cardStyle}> 
                 <CardContent className="cc">
                   <center>
                    <Tooltip title="Me gusta">
                    <button disabled={btnDis} onClick={()=> aceptadoDog(dog)} className='button2'><ThumbUpOffAltIcon></ThumbUpOffAltIcon></button>
                   </Tooltip>
                   <Tooltip title="No me gusta">
                   <button disabled={btnDis} onClick={()=> rechazadoDog(dog)} className='button'><ThumbDownOffAltIcon></ThumbDownOffAltIcon></button>
                   
                   </Tooltip>
                   </center>
                   <center>
                     <figure>
                       <img src={dog.imagen} className="perron" />
                       <figcaption> {dog.nombre} </figcaption>
                       
                       <p className="descripcion">{dog.descripcion}</p>
                     </figure>

                   
         </center>
         </CardContent>



       </Card>
       </Grid>

       </div> 
            }
          </div>
          <div className="middle" style={{overflowY: "auto"}}>
            {
                <div className= "aceptarL"> <center>¡Match Perruno!</center> 
                <Grid item md={50} xs={50} sx={{ background: "white" }}>
                      <List className="List" key={"a"}>
                        {aDog.slice().reverse().map((dog)=> (
                          <ListItem className='lista2'>
                            <Card className="card" style={cardStyle}> 
                          
                              <CardContent className="cc">
                              <center>
                              <figure>
                              <img src={dog.imagen} className="perron" />
                              <figcaption> {dog.nombre} </figcaption>
                              </figure>
                              <Tooltip title="Ya no me gusta">
                              <button onClick={()=> arrepentidoA(dog)} className='buttonR'><ThumbDownOffAltIcon></ThumbDownOffAltIcon></button>
                              </Tooltip>
                              </center>

                              </CardContent>
                              
                              
                              <CardActions disableSpacing>
        <Tooltip title="ver más">
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Ver Más"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        </Tooltip>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className="cc">
        <IconButton>
          <p className="descripcion2">{dog.descripcion}</p>
          </IconButton>
        </CardContent>
      </Collapse>
                              </Card>
                          </ListItem>
                        ))}
                      </List>

                </Grid>
            
          </div> 
              
        }
      </div>
      <div className="right" style={{ overflowY: "auto"}}>
        {

           <div className="rechazarL"><center>Rechazados por ti </center> 
                <Grid item md={50} xs={50} sx={{ background: "white" }}>
                    
                      <List className= "List2" key={"b"}>
                        {rDog.slice().reverse().map((dog) => (
                          <ListItem className='lista1'>
                            <Card className="card" style={cardStyle}> 
                         
                              <CardContent className="cc">
                              <center>
                              <figure>
                              <img src={dog.imagen} className="perron" />
                              <figcaption> {dog.nombre} </figcaption>
                              
                              </figure>
                
                              <Tooltip title="Ahora me gusta">
                              <button onClick={()=> arrepentidoR(dog)} className='buttonL'><ThumbUpOffAltIcon></ThumbUpOffAltIcon></button>
                              </Tooltip>
                              </center>
                              
          
                              </CardContent>
                              <CardActions disableSpacing>
        <Tooltip title="ver más">
        <ExpandMore2
          expand2={expanded2}
          onClick={handleExpandClick2}
          aria-expanded={expanded2}
          aria-label="Ver Más"
        >
          <ExpandMoreIcon />
        </ExpandMore2>
        </Tooltip>
      </CardActions>
      <Collapse in={expanded2} timeout="auto" unmountOnExit>
        <CardContent className="cc">
        <IconButton>
          <p className="descripcion1">{dog.descripcion}</p>
          </IconButton>
        </CardContent>
      </Collapse>
        </Card>
       </ListItem>
                        ))}
                      </List>
                    
    
                </Grid>
              </div>
        
        }
      </div>
  </div>
    </Grid>
    </Box>
  );
}





export default App

