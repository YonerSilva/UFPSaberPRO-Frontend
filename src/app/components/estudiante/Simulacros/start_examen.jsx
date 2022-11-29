import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ResponsiveContainer } from 'recharts';
import Paper from "@mui/material/Paper";
import CircularProgress from '@mui/material/CircularProgress';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useStore } from '../../../store/Provider/storeProvider';
import { useState } from 'react';
import useTimer from '../../extra/Temporizador';

const Start_Examen = () => {
  const navigate = useNavigate();
  const time = useState();
  const { formEditionSimu } = useStore();
  const [progress, setProgress] = React.useState(0);
  /*const [time, setTime] = useState({
    horas: parseInt(formEditionSimu.simu_duracion.split(":")[0]),
    minutos: parseInt(formEditionSimu.simu_duracion.split(":")[1]),
    segundos: 0
  });*/
  const tiempoSimu = formEditionSimu.simu_duracion;
  const { days, hours, minutes, seconds } = useTimer("2022-12-01T05:00:00.000");

  /*React.useEffect(() => {
    
    setInterval(() => {
      setProgress((tiempoSimu) => (tiempoSimu >= 100 ? 0 : tiempoSimu + 1));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [time]);*/

  useEffect(() => {
    if (Object.keys(formEditionSimu).length === 0) {
      navigate("/UFPSaberPRO/e/simulacros");
    } else {
      /*setInterval(() => {
        if (time.segundos > 0) {
          setTime({ ...time, segundos: time.segundos - 1 });
        } else {
          if (time.minutos > 0) {
            setTime({ ...time, minutos: time.minutos - 1, segundos: 60 });
          } else {
            if (time.minutos > 0) {
              setTime({ ...time, horas: time.horas - 1, minutos: 60 });
            }
          }
        }
        if (time.horas === 0 && time.minutos === 0 && time.segundos === 0) {
          return;
        }
      }, 1000);*/
    }
  }, [time]);
  return (
    <React.Fragment>
      <ResponsiveContainer>
        <div className='container'>
          <div className='container-fluid p-5'>
            <Paper>
              <div className="container-fluid">
                <Grid container spacing={3} className="row">
                  <Grid item xs={12} md={4}>
                    <Grid item xs={12} md={6}>
                      <Card sx={{ width: 300, mt: 3 }}>
                        <CardContent>
                          <Typography sx={{ display: "flex", justifyContent: "center" }} variant="h5" component="div">
                            Instrucciones
                          </Typography>
                          <hr />
                          <ul>
                            <li>No actualice la página.</li>
                            <li>No cierre las pestañas.</li>
                            <li>No minimices la ventana del navegador.</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card sx={{ width: 300, mt: 5 }}>
                        <CardContent sx={{ my: { xs: 1, md: 2 }, p: { xs: 3, md: 3 } }}>
                          <Typography sx={{ display: "flex", justifyContent: "center" }} variant="h5" component="div">
                            Temporizador
                          </Typography>
                          <hr />
                          <Typography variant='h6' component="div">
                            El cuestionario se enviará automáticamente cuando el temporizador llegue a
                          </Typography>
                          <h1 className="text-center">{days+" - "+":"+minutes+":"+seconds}{/*{ obtenerHoraFormateada() }*/}</h1>
                          <Box sx={{ display: 'flex', justifyContent: "center" }}>
                            <CircularProgress variant='determinate' value={progress} color="primary" />
                          </Box>
                          {/* <mat-spinner mode="determinate" style="margin: auto;"></mat-spinner> */}
                        </CardContent>
                      </Card>
                    </Grid >
                  </Grid>

                  <Grid item xs={12} md={8} >
                    <h1 className="mt-2">
                      En curso <b>{formEditionSimu.simu_nombre}</b>
                    </h1>
                    <Card>
                      <CardContent>
                        <p><b>{"1) "}</b> <span>Pregunta Yuber Zombie Homosexual (VALOR DE LA PREGUNTA) {formEditionSimu.simu_preg_puntaje}</span></p>
                        <hr />
                        <div className="row mt-2">
                          <div className="col-md-8 mt-10">
                            <input type="radio" />
                            Es la A
                          </div>
                          <div className="col-md-8 mt-10">
                            <input type="radio" />
                            Es la B
                          </div>
                          <div className="col-md-8 mt-10">
                            <input type="radio" />
                            Es la C
                          </div>
                          <div className="col-md-8 mt-10">
                            <input type="radio" />
                            Es la D
                          </div>
                        </div>
                      </CardContent>
                    </Card >
                    <Button sx={{ display: "flex", justifyContent: "center" }} type='submit' onClick={() => { navigate("/UFPSaberPRO/e/presentar_simulacro") }} size="large" className="btn btn-danger m-2 flex-end">
                      Enviar Simulacro
                    </Button>
                  </Grid>
                </Grid>
              </div >
            </Paper>
            <Paper>
              <div className="container mt-2">
                <div className="col-md-6 offset-md-3">
                  <Card>
                    <CardHeader>
                      <Typography>
                        Resultado de la prueba
                      </Typography>
                    </CardHeader>
                    <CardContent className="text-center">
                      <h2>Puntos conseguidos : {/*{ puntosConseguidos }*/}</h2>
                      <h2>Respuestas correctas : {/*{ respuestasCorrectas }*/}</h2>
                    </CardContent>
                    <CardActions className="text-center" sx={{ display: "flex", justifyContent: "center" }}>
                      <button onClick={() => {/*imprimirPagina()*/ }} color="primary">Imprimir</button>
                      <button color="accent">Inicio</button>
                    </CardActions>
                  </Card>
                </div>
              </div >
            </Paper>
          </div>
        </div>
      </ResponsiveContainer>
    </React.Fragment >
  );
}

export default Start_Examen;