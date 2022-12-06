import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useStore } from '../../../store/Provider/storeProvider';
import * as serviceConvocatoria from '../../../store/services/ConvocatoriaService';
import * as serviceSimulacro from '../../../store/services/SimulacroService';
import { alert_error, alert_success } from '../../../util/functions';
import { useState } from 'react';

const ConvocatoriaInformacion = () => {

     const dispatch = useDispatch();
     const { formEditionConvo } = useStore();
     const navigate = useNavigate();
     const [simulacro, setSimulacro] = useState({});

     const handleSubmit = (e) => {
          e.preventDefault();
          try {
               serviceConvocatoria.guardarUsuarioConvo(formEditionConvo.id_convocatoria).then(response => {
                    if (response.error === null) {
                         listarConvocatorias();
                         alert_success(response.message, "Usted se ha registrado con éxito a la convocatoria.");
                         navigate("/UFPSaberPRO/e/convocatorias");
                    } else {
                         alert_error("¡Error!", response.message);
                    }
               });
          } catch (error) {
               console.error(error);
          }
     }

     const listarConvocatorias = () => {
          try {
               serviceConvocatoria.getConvocatoriasUsuario().then(response => {
                    if (response.error === null) {
                         dispatch({
                              type: "SET_LISTA_CONVOCATORIAS_USUARIO",
                              payload: response.convocatorias
                         });
                    } else {
                         alert_error("¡Error!", response.message);
                    }
               });
          } catch (error) {
               console.error(error);
          }

          try {
               serviceConvocatoria.getConvocatoriasActivas().then(response => {
                    if (response.error === null) {
                         dispatch({
                              type: "SET_LISTA_CONOVOCATORIAS_ACTIVA",
                              payload: response.convocatorias
                         });
                    } else {
                         alert_error("¡Error!", response.message);
                    }
               });
          } catch (error) {
               console.error(error);
          }
     }

     const getSimulacro = () => {
          try {
               serviceSimulacro.getSimulacro(formEditionConvo.simulacro).then(response => {
                    if (response.error === null) {
                         setSimulacro(response.simulacro);
                    } else {
                         alert_error("¡Error!", response.message);
                    }
               });
          } catch (error) {
               console.error(error);
          }
     }

     useEffect(() => {
          if (Object.keys(formEditionConvo).length === 0 || formEditionConvo.id_convocatoria === undefined) {
               navigate("/UFPSaberPRO/e/convocatorias");
          } else {
               getSimulacro();
          }
          return () => {
               // Anything in here is fired on component unmount.
               dispatch({
                    type: "SET_FORM_EDITION_CONVO",
                    payload: {}
               });
          }
     }, []);

     return (
          <React.Fragment>
               <ResponsiveContainer>
                    <div className="container">
                         <div className="container-fluid">
                              <>
                                   <Typography component="h2" variant="h5" color="dark" gutterBottom>
                                        Informacion de la Convocatoria
                                   </Typography>
                                   <hr></hr>
                                   <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                                        <Form onSubmit={handleSubmit}>
                                             <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
                                                  <Grid item xs={6} >
                                                       <Card border="danger">
                                                            <Card.Header>CONVOCATORIA</Card.Header>
                                                            <Card.Body>
                                                                 <Card.Title>
                                                                      <b>Nombre: </b>
                                                                      {formEditionConvo.convo_nombre}
                                                                 </Card.Title>
                                                                 <Card.Text>
                                                                      <b>Descripcion: </b>
                                                                      <br />
                                                                      {formEditionConvo.convo_descripcion}
                                                                 </Card.Text>
                                                                 <Card.Text>
                                                                      <b>Fecha de Inicio: </b>
                                                                      {
                                                                           (() => {
                                                                                const fecha = new Date(formEditionConvo.convo_fecha_inicial);
                                                                                return fecha.toLocaleDateString() + ' - ' + fecha.toLocaleTimeString();
                                                                           })()
                                                                      }
                                                                      <br />
                                                                      <b>Fecha de Finalizacion: </b>
                                                                      {
                                                                           (() => {
                                                                                const fecha = new Date(formEditionConvo.convo_fecha_final);
                                                                                return fecha.toLocaleDateString() + ' - ' + fecha.toLocaleTimeString();
                                                                           })()
                                                                      }
                                                                 </Card.Text>
                                                                 <Card.Text>
                                                                      <b>Estado: </b>
                                                                      {formEditionConvo.convo_estado}
                                                                 </Card.Text>
                                                            </Card.Body>
                                                       </Card>
                                                  </Grid>

                                                  <Grid item xs={6} >
                                                       <Card border="danger">
                                                            <Card.Header>SIMULACRO</Card.Header>
                                                            <Card.Body>
                                                                 <Card.Title>
                                                                      <b>Nombre: </b>
                                                                      {simulacro.simu_nombre}
                                                                 </Card.Title>
                                                                 <Card.Text>
                                                                      <b>Descripcion: </b>
                                                                      <br />
                                                                      {simulacro.simu_descripcion}
                                                                 </Card.Text>
                                                                 <Card.Text>
                                                                      <b>Fecha Inicio: </b>
                                                                      {
                                                                           (() => {
                                                                                const fecha = new Date(formEditionConvo.simu_fecha_inicial);
                                                                                return fecha.toLocaleDateString() + ' - ' + fecha.toLocaleTimeString();
                                                                           })()
                                                                      }
                                                                      <br />
                                                                      <b>Duracion: </b>
                                                                      {formEditionConvo.simu_duracion}
                                                                 </Card.Text>
                                                            </Card.Body>
                                                       </Card>
                                                  </Grid>
                                                  <hr></hr>
                                                  <Grid item xs sx={{ display: "flex", justifyContent: "end" }}>
                                                       <Button type='button' onClick={() => { navigate("/UFPSaberPRO/e/convocatorias") }} size="large" className="btn btn-danger m-2 flex-start">
                                                            Volver
                                                       </Button>
                                                  </Grid>
                                                  <Grid item xs sx={{ display: "flex", justifyContent: "start" }}>
                                                       <Button type='submit' size="large" className="btn btn-danger m-2 flex-end">
                                                            Registrarse
                                                       </Button>
                                                  </Grid>
                                             </Grid>
                                        </Form>
                                   </Paper>
                              </>
                         </div>
                    </div>
               </ResponsiveContainer >
          </React.Fragment >
     );
};

export default ConvocatoriaInformacion;