import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ResponsiveContainer } from 'recharts';
import Paper from "@mui/material/Paper";
import { CardActions, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Grid from "@mui/material/Grid";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useStore } from '../../../store/Provider/storeProvider';
import moment from 'moment';
import Timer from '../../extra/Temporizador';
import { useState } from 'react';
import * as serviceSimulacro from '../../../store/services/SimulacroService';
import { alert_error, alert_loading } from '../../../util/functions';
import Cargador from '../../extra/CargadorEventos';
import { Form } from 'react-bootstrap';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const Start_Examen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formEditionSimu } = useStore();
  const [loading, setLoading] = useState(true);
  const [preguntas, setPreguntas] = useState([]);
  const duracion = parseInt(moment(formEditionSimu.simu_fecha_final).diff(moment(formEditionSimu.simu_fecha_inicial), 'seconds'));
  const simu_usu = {
    presentado: true,
    codigo: moment(new Date()).format("YYYY-MM-DD").replace("-", ""),
    simulacro: formEditionSimu.id_simulacro
  }
  var valida = false;

  const time = new Date();
  time.setSeconds(time.getSeconds() + duracion);

  const listarPreguntas = () => {
    serviceSimulacro.getPreguntasOpcionesSimu(formEditionSimu.id_simulacro).then(response => {
      if (response.error === null) {
        let array = response.preguntas;
        array.forEach(pregunta => {
          pregunta.opciones.forEach(opcion => {
            opcion.opc_respuesta = false;
          });
        });
        setPreguntas(array);
      } else {
        alert_error("¡Error!", response.message);
      }
      setLoading(false);
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!valida) {
        Swal.fire({
          title: '¿Quieres finalizar el examen?',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Finalizar',
          icon: 'info'
        }).then((result) => {
          if (result.isConfirmed) {
            sendSimulacro();
          }
        });
      } else {
        sendSimulacro();
      }

    } catch (error) {
      console.error(error);
    }
  }

  const sendSimulacro = () => {
    toast.promise(new Promise((resolve, reject) => {
      serviceSimulacro.presentar_simulacro(simu_usu, preguntas).then(response => {
        if (response.error === null) {
          resolve();
          listarSimulacros();
          setTimeout(() => { navigate("/UFPSaberPRO/e/simulacros") }, 2000);
        } else {
          reject();
        }
      });
    }), {
      loading: "Cargando...",
      error: "¡Error! \n" + "¡Oops!, no se ha podido enviar el simulacro.",
      success: "¡Se ha enviado el simulacro con éxito!",
    });
  }

  const sendByTempo = async () => {
    valida = true;
  }

  const listarSimulacros = () => {
    try {
      serviceSimulacro.getSimulacrosConvo().then(response => {
        if (response.error === null) {
          dispatch({
            type: "SET_LISTA_SIMULACROS_USUARIO",
            payload: response.simulacros
          });
          alert_loading(response.message);
        } else {
          alert_error("¡Error!", response.message);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (Object.keys(formEditionSimu).length === 0) {
      navigate("/UFPSaberPRO/e/simulacros");
    } else {
      listarPreguntas();
    }

    return () => {
      dispatch({
        type: "SET_FORM_EDITION_SIMU",
        payload: {}
      });
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
                                        <Timer expiryTimestamp={time} sendByTempo={sendByTempo} />
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
                                <button id="btn_presentar" type='submit' size="large" className="btn btn-danger m-2">
                                  Enviar Simulacro
                                </button>
                              </Form>
                            </Grid>
                          </Grid>
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

  const handleChange = (e) => {
    let valor = String(e.target.value).split(",");
    const id_pregunta = parseInt(valor[0]);
    const id_opcion = parseInt(valor[1]);
    const pregunta = preguntas.filter(preg => parseInt(preg.id_pregunta) === id_pregunta)[0];
    if (pregunta !== undefined && pregunta !== null) {
      pregunta.opciones.forEach(opc => {
        if (id_opcion === opc.id_opcion) {
          opc.opc_respuesta = true;
        } else {
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
                                        <FormControlLabel key={opcion.id_opcion} value={pregunta.id_pregunta + "," + opcion.id_opcion} control={<Radio />} label={opcion.opc_descripcion} />
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
                              <div className="col-md-8 mt-10">
                                <FormControl>
                                  <RadioGroup
                                    name="opcion"
                                    onChange={handleChange}
                                  >
                                    {
                                      pregunta.opciones.map((opcion, i) => (
                                        <FormControlLabel key={opcion.id_opcion} value={pregunta.id_pregunta + "," + opcion.id_opcion} control={<Radio />} label={opcion.opc_descripcion} />
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
        })()
      }
    </>
  )
}