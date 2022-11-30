import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ResponsiveContainer } from 'recharts';
import Paper from "@mui/material/Paper";
import { Button, CardActions, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Grid from "@mui/material/Grid";
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store/Provider/storeProvider';
import moment from 'moment';
import Timer from '../../extra/Temporizador';
import { useState } from 'react';
import * as serviceSimulacro from '../../../store/services/SimulacroService';
import { alert_error } from '../../../util/functions';
import Cargador from '../../extra/CargadorEventos';
import { Form } from 'react-bootstrap';
import useAuth from '../../auth/useAuth';

const Start_Examen = () => {
  const navigate = useNavigate();
  const { formEditionSimu } = useStore();
  const {auth} = useAuth();
  const [loading, setLoading] = useState(true);
  const [preguntas, setPreguntas] = useState([]);
  const duracion = parseInt(moment(formEditionSimu.simu_fecha_final).diff(moment(formEditionSimu.simu_fecha_inicial), 'seconds'));

  const time = new Date();
  time.setSeconds(time.getSeconds() + duracion);

  const listarPreguntas = () => {
    serviceSimulacro.getPreguntasOpcionesSimu(formEditionSimu.id_simulacro).then(response => {
      if (response.error === null) {
        setPreguntas(response.preguntas);
      } else {
        alert_error("¡Error!", response.message);
      }
      setLoading(false);
    });
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    try {
      
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if (Object.keys(formEditionSimu).length === 0) {
      navigate("/UFPSaberPRO/e/simulacros");
    } else {
      listarPreguntas();
    }
  }, []);

  return (
    <React.Fragment>
      <ResponsiveContainer>
        <div className='container'>
          <div className='container-fluid p-5'>
            {
              (() => {
                if (!loading) {
                  return (
                    <>
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
                                {
                                  preguntas.length > 0
                                    ?
                                    <Card sx={{ width: 300, mt: 5 }}>
                                      <CardContent sx={{ my: { xs: 1, md: 2 }, p: { xs: 3, md: 3 } }}>
                                        <Typography sx={{ display: "flex", justifyContent: "center" }} variant="h5" component="div">
                                          Temporizador
                                        </Typography>
                                        <hr />
                                        <Typography variant='h6' component="div">
                                          El cuestionario se enviará automáticamente cuando el temporizador llegue a
                                        </Typography>
                                        <span className="text-center"><b>Duracion: </b></span>
                                        <Timer expiryTimestamp={time} />
                                      </CardContent>
                                    </Card>
                                    : <></>
                                }
                              </Grid >
                            </Grid>

                            <Grid item xs={12} md={8} >
                              <Form onSubmit={handleSubmit}>
                                <h1 className="mt-2">
                                  <b>{formEditionSimu.simu_nombre}</b>
                                </h1>
                                <div>
                                  {
                                    preguntas.length > 0
                                      ?
                                      <>
                                        <Generar_Preguntas preguntas={preguntas.filter(item => parseInt(item.preg_tipo) === 1)} tipo={1} />
                                        <Generar_Preguntas preguntas={preguntas.filter(item => parseInt(item.preg_tipo) === 2)} tipo={2} />
                                      </>
                                      :
                                      <></>
                                  }
                                </div>
                                <button type='submit' size="large" className="btn btn-danger m-2">
                                  Enviar Simulacro
                                </button>
                              </Form>
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
                    </>
                  )
                } else {
                  return (<Cargador />)
                }
              })()
            }

          </div>
        </div>
      </ResponsiveContainer>
    </React.Fragment >
  );
}

export default Start_Examen;


const Generar_Preguntas = ({ preguntas, tipo }) => {

  const handleChange = (e) =>{
    let valor = String(e.target.value).split(",");
    const id_pregunta = parseInt(valor[0]);
    const id_opcion = parseInt(valor[1]);
    const pregunta = preguntas.filter(preg => parseInt(preg.id_pregunta)===id_pregunta)[0];
    if(pregunta !== undefined && pregunta !== null){
      pregunta.opciones.forEach(opc => {
        if(id_opcion===opc.id_opcion){
          opc.opc_respuesta = true;
        }else{
          opc.opc_respuesta = false;
        }
      });
    }
  }

  return (
    <>
      {
        (() => {
          if (tipo === 1 && preguntas.length > 0) {
            return (
              <div className='mt-4'>
                <div className='d-flex row'>
                  <h4 className='col-8'>PREGUNTAS VERDADERO O FALSO</h4>
                  <h5 className='col-4 my-auto'>PREGUNTAS TOTALES({preguntas.length})</h5>
                </div>
                {
                  preguntas.map((pregunta, index) => {
                    return (
                      <Card>
                        <CardContent>
                          <div className='d-flex'>
                            <h5 className='col-10 mx-2' ><b>{(index + 1) + ") "}</b> <span>{pregunta.preg_descripcion}</span></h5>
                            <h5 className='col-2'>VALOR({pregunta.simu_preg_puntaje})</h5>
                          </div>
                          <hr />
                          {
                            pregunta.preg_imagen !== "" && pregunta.preg_imagen !== null && pregunta.preg_imagen !== undefined
                              ?
                              <>
                                <div className="card shadow mx-auto" style={{ width: '18rem' }}>
                                  <img src={pregunta.preg_imagen} className="card-img-top" style={{ height: '30vh', width: '100%', objectFit: 'cover' }} />
                                </div>
                                <hr />
                              </>
                              :
                              <></>
                          }
                          <div className="row mt-2">
                            {
                              <div className="col-md-8 mt-10">
                                <FormControl>
                                  <RadioGroup
                                    name="opcion"
                                    onChange={handleChange}
                                  >
                                    {
                                      pregunta.opciones.map((opcion, i) => (
                                        <FormControlLabel key={opcion.id_opcion} value={pregunta.id_pregunta+","+opcion.id_opcion} control={<Radio />} label={opcion.opc_descripcion}/>
                                      ))
                                    }
                                  </RadioGroup>
                                </FormControl>
                              </div>

                            }
                          </div>
                        </CardContent>
                      </Card >
                    )
                  })
                }
              </div>
            )
          }

          if (tipo === 2 && preguntas.length > 0) {
            return (
              <div className='mt-4'>
                <div className='d-flex row'>
                  <h4 className='col-8'>PREGUNTAS SELECCION MULTIPLE</h4>
                  <h5 className='col-4 my-auto'>PREGUNTAS TOTALES({preguntas.length})</h5>
                </div>
                {
                  preguntas.map((pregunta, index) => {
                    return (
                      <Card>
                        <CardContent>
                          <div className='d-flex'>
                            <h5 className='col-10 mx-2' ><b>{(index + 1) + ") "}</b> <span>{pregunta.preg_descripcion}</span></h5>
                            <h5 className='col-2'>VALOR({pregunta.simu_preg_puntaje})</h5>
                          </div>
                          <hr />
                          {
                            pregunta.preg_imagen !== "" && pregunta.preg_imagen !== null && pregunta.preg_imagen !== undefined
                              ?
                              <>
                                <div className="card shadow mx-auto" style={{ width: '18rem' }}>
                                  <img src={pregunta.preg_imagen} className="card-img-top" style={{ height: '30vh', width: '100%', objectFit: 'cover' }} />
                                </div>
                                <hr />
                              </>
                              :
                              <></>
                          }
                          <div className="row mt-2">
                            {
                              pregunta.opciones.map((opcion, i) => (
                                <div className="col-md-8 mt-10">
                                  <div>
                                    <input type="radio" className='mx-2' />
                                    {opcion.opc_descripcion}
                                  </div>
                                  {
                                    opcion.opc_imagen !== "" && pregunta.opc_imagen !== null && pregunta.opc_imagen !== undefined
                                      ?
                                      <>
                                        <div className="card shadow" style={{ width: '18rem' }}>
                                          <img src={opcion.opc_imagen} className="card-img-top" style={{ height: '30vh', width: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <hr />
                                      </>
                                      :
                                      <></>
                                  }
                                </div>
                              ))
                            }
                          </div>
                        </CardContent>
                      </Card >
                    )
                  })
                }
              </div>
            )
          }
        })()
      }
    </>
  )
}