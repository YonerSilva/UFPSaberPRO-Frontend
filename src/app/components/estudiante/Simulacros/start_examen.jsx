import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ResponsiveContainer } from 'recharts';
import Paper from "@mui/material/Paper";
import {  FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
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
    codigo: moment(new Date()).format("YYYY/MM/DD").replace('/', "").replace('/',""),
    simulacro: formEditionSimu.id_simulacro
  }

  console.log()
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
    if (Object.keys(formEditionSimu).length === 0 && formEditionSimu.id_simulacro===undefined) {
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
          <div className='container-fluid mt-5'>
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
                                        <Typography variant="h5">
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
                                      <GenerarPreguntas key={1} preguntas={preguntas} />
                                      :
                                      <></>
                                  }
                                </div>
                                <div className='d-flex justify-content-center'>
                                  <button id="btn_presentar" type='submit' size="large" className="btn btn-danger m-2">
                                    Enviar Simulacro
                                  </button>
                                </div>
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


const GenerarPreguntas = ({ preguntas }) => {
  const { lista_subcategorias_programa } = useStore();
  const [subcategorias, setSubcategorias] = useState([]);

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

  const listarSubcategorias = () => {
    const unicos = [];
    let array = preguntas.reduce((acc, valor) => {
      if (!unicos.includes(valor.id_subcategoria)) {
        unicos.push(valor.id_subcategoria);
        acc.push(valor.id_subcategoria);
      }
      return acc;
    }, []);

    setSubcategorias(array);
  }

  useEffect(() => {
    listarSubcategorias();
  }, []);

  return (
    <>
      {
        (() => {
          console.log(subcategorias)
          if (subcategorias.length > 0) {
            return (
              subcategorias.map((sub, index) => {
                return (
                  <div className='mt-4'>
                    <div className='d-flex row'>
                      <h4 className='col-8' style={{ fontWeight: 'bold' }}>{lista_subcategorias_programa.find(element => element.id_subcategoria == sub).sub_nombre}</h4>
                      <h5 className='col-4 my-auto'>CANTIDAD PREGUNTAS({preguntas.filter(item => item.id_subcategoria === sub).length})</h5>
                    </div>
                    {
                      preguntas.filter(item => item.id_subcategoria === sub).map((pregunta, index) => {
                        return (
                          <Card>
                            <CardContent>
                              <div className='d-flex row'>
                                <h5 className='col-10' ><b>{(index + 1) + ") "}</b> <span>{pregunta.preg_descripcion}</span></h5>
                                <h5 className='col-2' style={{ fontWeight: 'bold' }}>VALOR({pregunta.simu_preg_puntaje})</h5>
                              </div>
                              <hr />
                              {
                                pregunta.preg_imagen !== "" && pregunta.preg_imagen !== null && pregunta.preg_imagen !== undefined
                                  ?
                                  <div className="uk-cover-container d-flex justify-content-center">
                                    <img src={pregunta.preg_imagen} alt="imagen" />
                                  </div>
                                  :
                                  <></>
                              }
                              <div className="row mt-2">
                                <div className="col-12 mt-10">
                                  <FormControl>
                                    <RadioGroup name="opcion" onChange={handleChange}>
                                      {
                                        pregunta.opciones.map((opcion, i) => (
                                          <>
                                            <FormControlLabel className='mb-2' key={opcion.id_opcion} value={pregunta.id_pregunta + "," + opcion.id_opcion} control={<Radio />} label={opcion.opc_descripcion} />
                                            {
                                              opcion.opc_imagen !== "" && opcion.opc_imagen !== null && opcion.opc_imagen !== undefined
                                                ?
                                                <div className="uk-cover-container d-flex justify-content-center">
                                                  <img src={opcion.opc_imagen} alt="imagen" />
                                                </div>
                                                :
                                                <></>
                                            }
                                          </>
                                        ))
                                      }
                                    </RadioGroup>
                                  </FormControl>
                                </div>
                              </div>
                            </CardContent>
                          </Card >
                        )
                      })
                    }
                  </div>
                )
              })
            )
          }
          /*
                    if (tipo === 1 && preguntas.length > 0) {
                      return (
                <div className='mt-4'>
                  <div className='d-flex row'>
                    <h5 className='col-8'>PREGUNTAS VERDADERO O FALSO</h5>
                    <h5 className='col-4 my-auto'>PREGUNTAS TOTALES({preguntas.length})</h5>
                  </div>
                  {
                    preguntas.map((pregunta, index) => {
                      return (
                        <Card>
                          <CardContent>
                            <Grid item xs={12}>
                              <h5 className='col-10 mx-2' ><b>{(index + 1) + ") "}</b> <span>{pregunta.preg_descripcion}</span></h5>
                              <h5 className='col-2'>VALOR({pregunta.simu_preg_puntaje})</h5>
                            </Grid>
                            <hr />
                            {
                              pregunta.preg_imagen !== "" && pregunta.preg_imagen !== null && pregunta.preg_imagen !== undefined
                                ?
                                <div className="uk-cover-container d-flex justify-content-center">
                                  <img src={pregunta.preg_imagen} alt="" uk-cover />
                                </div>
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
                    <h5 className='col-8'>PREGUNTAS SELECCION MULTIPLE</h5>
                    <h5 className='col-4 my-auto'>PREGUNTAS TOTALES({preguntas.length})</h5>
                  </div>
                  {
                    preguntas.map((pregunta, index) => {
                      return (
                        <Card>
                          <CardContent>
                            <Grid item xs={12}>
                              <h5 className='col-10 mx-2' ><b>{(index + 1) + ") "}</b> <span>{pregunta.preg_descripcion}</span></h5>
                              <h5 className='col-2'>VALOR({pregunta.simu_preg_puntaje})</h5>
                            </Grid>
                            <hr />
                            {
                              pregunta.preg_imagen !== "" && pregunta.preg_imagen !== null && pregunta.preg_imagen !== undefined
                                ?
                                <>
                                  <div className="uk-cover-container d-flex justify-content-center">
                                    <img src={pregunta.preg_imagen} alt="" uk-cover />
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
                    }*/
        })()
      }
    </>
  )
}