import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  TextField,
} from "@mui/material";


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
  });
  const [isLoading, setLoading] = useLoadingMessage();
  const [rDog, setRDog] = useState ([]);
  const [aDog, setADog] = useState ([]);
  const [btnDis, setbtnDis] = useState(false);
  

  const cardStyle ={
    widht: '350px',
    height: '515px',
    margin: '0px',
  };


  const getDog=()=> {
    setbtnDis(true);
    setLoading(true);
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



  return (
    <Box>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
        spacing={1}
      >
        <div className="App">
          <div className="left">
            {
              <div className="rechazarL"><center>Rechazados por ti </center> 
                <Grid item md={50} xs={50} sx={{ background: "gray" }}>
                  <Card >
                    <CardContent>
                      
                      <List>
                        {rDog.map((dog) => (
                          <ListItem className='lista1'>
                            <Card>
                              <CardContent>
                              <center>
                              <figure>
                              <img src={dog.imagen} className="perron" />
                              <figcaption> {dog.nombre} </figcaption>
                              </figure>
                              <button onClick={()=> arrepentidoR(dog)} className='buttonL'>Arrenpentirse</button>
                              </center>
                              
          
                              </CardContent>
                            </Card>
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </div>
            }
          </div>
          <div className="middle">
            {
              <div className="perrosL"> <center>Perritos Candidatos</center>
                {isLoading && <center><p>Cargando...</p></center>} 
                <Grid item md={50} xs={50} sx={{ background: "gray"   }}>
                  <Card style={cardStyle}> 
                    <CardContent>
                      <center>
                      <button disabled={btnDis} onClick={()=> rechazadoDog(dog)} className='button'>Rechazar</button>
                      <button disabled={btnDis} onClick={()=> aceptadoDog(dog)} className='button2'>Elegir</button>
                      </center>
                      <center>
                        <figure>
                          <img src={dog.imagen} className="perron" />
                          <figcaption> {dog.nombre} </figcaption>
                        </figure>
            </center>
            </CardContent>
          </Card>
          </Grid>

          
          
          </div> 
        }
      </div>
      <div className="right">
        {
          <div className= "aceptarL"> <center>¡Match Perruno!</center> 
                <Grid item md={50} xs={50} sx={{ background: "gray" }}>
                  <Card> 
                    <CardContent>
                      <List>
                        {aDog.map((dog)=> (
                          <ListItem className='lista2'>
                            <Card>
                              <CardContent>
                              <center>
                              <figure>
                              <img src={dog.imagen} className="perron" />
                              <figcaption> {dog.nombre} </figcaption>
                              </figure>
                              <button onClick={()=> arrepentidoA(dog)} className='buttonR'>Arrenpentirse</button>
                              </center>

                              </CardContent>
                            </Card>
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
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