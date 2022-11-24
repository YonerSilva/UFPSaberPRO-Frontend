import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';
import Barra from '../extra/BarraBusqueda';
import Cargador from "../extra/CargadorEventos";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import { useStore } from '../../store/Provider/storeProvider';
import * as serviceSimulacro from '../../store/services/SimulacroService';
import { alert_error, alert_loading } from '../../util/functions';
import NoPreguntas from './NoPreguntasS';
import { Grid, Link } from '@mui/material';
import { Button } from 'react-bootstrap';

const SimPregList = () => {
     const { formEditionSimu } = useStore();
     const [preguntas, setPreguntas] = useState([]);
     const [busqueda, setBusqueda] = useState("");
     const [loading, setLoading] = useState(true);
     const navigate = useNavigate();

     const columnas = [
          {
               text: "DESCRIPCION",
               dataField: "preg_descripcion",
               align: "center",
               sort: true,
          },
          {
               text: "VALOR",
               dataField: "simu_preg_puntaje",
               align: "center",
               sort: true,
          },
          {
               text: "IMAGEN",
               dataField: "preg_imagen",
               align: "center",
               isDummyField: true,
               formatter: (cellContent, row) => {
                    if (row.preg_imagen !== null && row.preg_imagen !== "") {
                         return <Link href={row.preg_imagen} target="_blank">Imagen</Link>
                    }else{
                         return <span>No disponible.</span>
                    }
               }
          },
          {
               text: "ESTADO",
               dataField: "preg_estado",
               align: 'center',
               sort: true,
               formatter: (cellContent, row) => {
                    switch (row.preg_estado) {
                         case "A":
                              return <span className='estado-color-activo'>ACTIVO</span>
                         case "I":
                              return <span className='estado-color-inactivo'>INACTIVO</span>
                         case "B":
                              return <span className='estado-color-bloqueado'>BLOQUEADO</span>
                         default:
                              return <></>;
                    }
               }
          },
          {
               text: "TIPO",
               dataField: "preg_tipo",
               align: 'center',
               formatter: (cellContent, row) => {
                    switch (row.preg_tipo) {
                         case 1:
                              return <span>VERDADERO O FALSO</span>
                         case 2:
                              return <span>SELECCION MULTIPLE</span>
                         case 3:
                              return <span>COMPARACION</span>
                         default:
                              return <></>;
                    }
               }
          },
          {
               text: "ACCIÓN",
               dataField: "fd1",
               isDummyField: true,
               formatter: (cellContent, row) => {
                    if (row.preg_estado === 'I') {
                         return (
                              <div className="row-cols-2 row-cols-md-auto" align="center">
                              </div>
                         )
                    }
               },
          },
     ];

     const listarPreguntas = (response) => {
          try {
               serviceSimulacro.getPreguntas(formEditionSimu.id_simulacro).then(response => {
                    if (response.error === null) {
                         setPreguntas(response.preguntas);
                         alert_loading(response.message);
                    } else {
                         alert_error("¡Error!", response.message);
                    }
                    setLoading(false);
               });
          } catch (error) {
               console.error(error);
          }
     }

     const handleBuscar = (data) => {
          if (busqueda === "") {
               return preguntas;
          } else {
               return data.filter((item) =>
                    item.preg_descripcion
                         .toString()
                         .toUpperCase()
                         .includes(busqueda.toUpperCase())
               );
          }
     };

     useEffect(() => {
          console.log(formEditionSimu)
          if (Object.keys(formEditionSimu).length === 0 || formEditionSimu.id_simulacro === undefined) {
               navigate('/UFPSaberPRO/a/simulacros');
          } else {
               listarPreguntas();
          }
     }, []);

     return (
          <React.Fragment>
               <ResponsiveContainer>
                    <div className="container">
                         <Typography component="h2" variant="h5" color="dark" gutterBottom>
                              Lista de Preguntas del Simulacro
                         </Typography>
                         {(() => {
                              if (preguntas.length !== 0) {
                                   return (
                                        <Barra
                                             button={<button type="button" onClick={() => { navigate("/UFPSaberPRO/a/simulacros/seleccionar_preguntas") }} className="btn btn-danger m-2">Seleccionar Preguntas</button>}
                                             input={<input onChange={(e) => { setBusqueda(e.target.value) }} title="Nombre Pregunta" placeholder="Buscar Pregunta" className="form-control me-2" type="search" aria-label="Buscar" />}
                                        />
                                   );
                              }
                         })()}

                         <hr />
                         <div className="container-fluid">
                              {(() => {
                                   if (!loading) {
                                        if (preguntas.length === 0) {
                                             return <NoPreguntas />;
                                        } else {
                                             return (
                                                  <>
                                                       <BootstrapTable
                                                            headerClasses="table-head"
                                                            classes="table-design shadow"
                                                            bootstrap4
                                                            wrapperClasses="table-responsive"
                                                            striped
                                                            bordered
                                                            hover
                                                            keyField="id_pregunta"
                                                            data={handleBuscar(preguntas)}
                                                            columns={columnas}
                                                            pagination={paginationFactory()}
                                                            noDataIndication="No hay registros disponibles."
                                                       />
                                                       <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
                                                            <Button onClick={() => { navigate("/UFPSaberPRO/a/simulacros") }} size="large" className="btn btn-danger m-2">
                                                                 Volver
                                                            </Button>
                                                       </Grid >
                                                  </>
                                             );
                                        }
                                   } else {
                                        return <Cargador />;
                                   }
                              })()}
                         </div>
                    </div>
               </ResponsiveContainer>
          </React.Fragment>
     );
};

export default SimPregList;