import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import Cargador from "../../extra/CargadorEventos";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import Paper from "@mui/material/Paper";
import { useDispatch, useStore } from '../../../store/Provider/storeProvider';
import DeleteIcon from '@mui/icons-material/Delete';
import * as serviceSimulacro from '../../../store/services/SimulacroService';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { alert_error, alert_loading, alert_success } from '../../../util/functions';
import NoPreguntas from '../../preguntas/NoPreguntas';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button, Card, Form } from 'react-bootstrap';
import cellEditFactory from 'react-bootstrap-table2-editor';
import Container from '@mui/material/Container';
import Swal from 'sweetalert2';

const ConvocatoriaInformacion = () => {

     const navigate = useNavigate();

     return (
          <React.Fragment>
               <ResponsiveContainer>
                    <div className="container">
                         <div className="container-fluid">
                              <>
                                   <Paper
                                        variant="outlined"
                                        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                                   >
                                        <Typography component="h2" variant="h5" color="dark" gutterBottom>
                                             Informacion de la Convocatoria
                                        </Typography>
                                        <hr></hr>
                                        <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center", mb: 5 }}>

                                             <Grid item xs={6}>
                                                  <Card border="danger">
                                                       <Card.Header>CONVOCATORIA</Card.Header>
                                                       <Card.Body>
                                                            <Card.Title>
                                                                 <b>Nombre: </b>
                                                            </Card.Title>
                                                            <Card.Text>
                                                                 <b>Descripcion: </b>
                                                                 <br />
                                                                 <b>Fecha de Inicio: </b>
                                                                 <br />
                                                                 <b>Fecha de Finalizacion: </b>
                                                            </Card.Text>
                                                            <Card.Text>
                                                                 <b>Estado: </b>
                                                                 <br />
                                                                 <b>Programa: </b>
                                                                 <br />
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
                                                                 <br />
                                                                 <br />
                                                            </Card.Title>
                                                            <Card.Text>
                                                                 <b>Descripcion: </b>
                                                                 <br />
                                                            </Card.Text>
                                                            <Card.Text>
                                                            <br />
                                                                 <b>Estado: </b>
                                                                 <br />
                                                                 <b>Programa: </b>
                                                                 <br />
                                                            </Card.Text>
                                                       </Card.Body>
                                                  </Card>
                                             </Grid>
                                             <hr></hr>
                                             <Grid item xs sx={{ display: "flex", justifyContent: "end" }}>
                                                  <Button onClick={() => { navigate(-1) }} size="large" className="btn btn-danger m-2 flex-start">
                                                       Volver
                                                  </Button>
                                             </Grid>
                                             <Grid item xs sx={{ display: "flex", justifyContent: "start" }}>
                                                  <Button onClick={() => { navigate(-1) }} size="large" className="btn btn-danger m-2 flex-end">
                                                       Registrarse
                                                  </Button>
                                             </Grid>
                                        </Grid>
                                   </Paper>
                              </>
                         </div>
                    </div>
               </ResponsiveContainer >
          </React.Fragment >
     );
};

export default ConvocatoriaInformacion;