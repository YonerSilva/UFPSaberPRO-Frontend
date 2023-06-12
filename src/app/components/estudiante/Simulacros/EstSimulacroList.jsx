import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import IconButton from "@mui/material/IconButton";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Cargador from '../../extra/CargadorEventos';
import Barra from '../../extra/BarraBusqueda';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from "react-bootstrap";
import Grid from "@mui/material/Grid";
import * as serviceSimulacro from '../../../store/services/SimulacroService';
import { useStore, useDispatch } from '../../../store/Provider/storeProvider';
import { alert_error, alert_loading } from '../../../util/functions';

const ListaSimulacrosE = () => {
     const dispatch = useDispatch();
     const { lista_simulacros_usuario, lista_simulacros_activo } = useStore();
     const [loading, setLoading] = useState(true);
     const [busqueda, setBusqueda] = useState("");
     const navigate = useNavigate();
     const theme = createTheme();

     const columnasA = [
          {
               text: "NOMBRE",
               dataField: "simu_nombre",
               align: 'center',
               sort: true,
          },
          {
               text: "DESCRIPCION",
               dataField: "simu_descripcion",
               align: 'center',
               sort: true,
          },
          {
               text: "PUNTAJE MAX",
               dataField: "simu_puntaje_maximo",
               align: 'center',
               sort: true,
          },
          {
               text: "ESTADO",
               dataField: "simu_estado",
               align: 'center',
               sort: true,
               formatter: (cellContent, row) => {
                    switch (row.simu_estado) {
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
               text: "ACCIÓN",
               dataField: "fd1",
               isDummyField: true,
               formatter: (cellContent, row) => {
                    if (row.simu_estado === "A") {
                         return (
                              <div className='row-cols-2 row-cols-md-auto' align='center'>
                                   <IconButton onClick={() => { presentarSimulacro(row) }} title='Presentar Simulacro' style={{ color: "blue" }}><HistoryEduIcon /></IconButton>
                              </div>
                         )
                    }
               }
          }
     ]

     const columnasU = [
          {
               text: "NOMBRE",
               dataField: "simu_nombre",
               align: 'center',
               sort: true,
          },
          {
               text: "DESCRIPCION",
               dataField: "simu_descripcion",
               align: 'center',
               sort: true,
          },
          {
               text: "CÓDIGO",
               dataField: "simu_codigo",
               align: 'center',
               sort: true,
          },
          {
               text: "PUNTAJE OBTENIDO",
               dataField: "simu_puntaje_obtenido",
               align: 'center',
               formatter: (cell, row) => {
                    return (row.simu_puntaje_obtenido+"/"+row.simu_puntaje_maximo)
               },
               sort: true,
          },
          {
               text: "ESTADO",
               dataField: "simu_estado",
               align: 'center',
               sort: true,
               formatter: (cellContent, row) => {
                    switch (row.simu_estado) {
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
               text: "ACCIÓN",
               dataField: "fd1",
               isDummyField: true,
               formatter: (cellContent, row) => {
                    if (row.simu_estado !== "A") {
                         return (
                              <div className='row-cols-2 row-cols-md-auto' align='center'>
                                   <IconButton onClick={() => { verEstadisticas(row) }} title='Ver Estadisticas' style={{ color: "blue" }}><VisibilityIcon /></IconButton>
                              </div>
                         )
                    }
               }
          }
     ]

     const listarSimulacrosActivos = () => {
          try {
               serviceSimulacro.getSimulacrosConvo().then(response => {
                    if (response.error === null) {
                         response.simulacros.forEach((element,i) => {
                              element["id"] = i;
                         });
                         dispatch({
                              type: "SET_LISTA_SIMULACROS_ACTIVO",
                              payload: response.simulacros
                         });
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

     const listarSimulacrosUsu = () => {
          try {
               serviceSimulacro.getSimulacrosUsu().then(response => {
                    if (response.error === null) {
                         response.simulacros.forEach((element,i) => {
                              element["id"] = i;
                         });
                         dispatch({
                              type: "SET_LISTA_SIMULACROS_USUARIO",
                              payload: response.simulacros
                         });
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

     const presentarSimulacro = (item) => {
          dispatch({
               type: "SET_FORM_EDITION_SIMU",
               payload: item
          });
          navigate("/UFPSaberPRO/e/informacion_simulacro");
     }

     const verEstadisticas = (item) => {
          dispatch({
               type: "SET_FORM_EDITION_SIMU",
               payload: item
          });
          navigate("/UFPSaberPRO/e/estadisticas_simulacro");
     }

     const handleBuscarA = (data) => {
          if (busqueda === "") {
               return lista_simulacros_activo;
          } else {
               return data.filter(
                    (item) =>
                         item.simu_nombre.toString().toUpperCase().includes(busqueda.toUpperCase())
               );
          }
     }

     const handleBuscarU = (data) => {
          if (busqueda === "") {
               return lista_simulacros_usuario;
          } else {
               return data.filter(
                    (item) =>
                         item.simu_nombre.toString().toUpperCase().includes(busqueda.toUpperCase())
               );
          }
     }

     useEffect(() => {
          listarSimulacrosActivos();
          listarSimulacrosUsu();
     }, []);

     return (
          <React.Fragment>
               <ResponsiveContainer>
                    <div className="container">
                         {
                              (() => {
                                   if (!loading) {
                                        return (
                                             <>
                                                  <Typography component="h2" variant="h5" color="dark" gutterBottom>
                                                       Lista de Simulacros Activos
                                                  </Typography>
                                                  {
                                                       (() => {
                                                            if (lista_simulacros_activo.length !== 0) {
                                                                 return (
                                                                      <Barra
                                                                           input={<input onChange={(e) => { setBusqueda(e.target.value) }} title='Nombre Simulacro' placeholder="Buscar Simulacro" className="form-control me-2 border border-danger shadow" type="search" aria-label="Buscar" />}
                                                                      />
                                                                 )
                                                            }
                                                       })()
                                                  }
                                                  <hr />
                                                  <div className="container-fluid">
                                                       {
                                                            (() => {
                                                                 if (lista_simulacros_activo.length === 0) {
                                                                      return (
                                                                           <ThemeProvider theme={theme}>
                                                                                <CssBaseline />
                                                                                <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                                                                                     <h2 align="center">
                                                                                          ¡No hay simulacros activos! Registrate en una convocatoria primero.
                                                                                     </h2>
                                                                                     <div className='mx-auto'>
                                                                                          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
                                                                                               <img className="" src={process.env.PUBLIC_URL + '/images/error.png'} alt="" height={200} />
                                                                                          </Grid>
                                                                                     </div>
                                                                                </Container>
                                                                           </ThemeProvider>
                                                                      )
                                                                 } else {
                                                                      return (
                                                                           <BootstrapTable 
                                                                                headerClasses='table-head'
                                                                                classes='table-design shadow'
                                                                                bootstrap4
                                                                                wrapperClasses='table-responsive'
                                                                                striped
                                                                                bordered
                                                                                hover
                                                                                keyField='id'
                                                                                data={handleBuscarA(lista_simulacros_activo)}
                                                                                columns={columnasA}
                                                                                pagination={paginationFactory()}
                                                                                noDataIndication='No hay registros disponibles.' />
                                                                      )
                                                                 }
                                                            })()
                                                       }
                                                  </div>

                                                  <hr className="hr" />

                                                  <Typography component="h2" variant="h5" color="dark" gutterBottom>
                                                       Lista de Simulacros Presentados
                                                  </Typography>
                                                  {
                                                       (() => {
                                                            if (lista_simulacros_usuario.length !== 0) {
                                                                 return (
                                                                      <Barra
                                                                           input={<input onChange={(e) => { setBusqueda(e.target.value) }} title='Nombre Simulacro' placeholder="Buscar Simulacro" className="form-control me-2 border border-danger shadow" type="search" aria-label="Buscar" />}
                                                                      />
                                                                 )
                                                            }
                                                       })()
                                                  }
                                                  <hr />
                                                  <div className="container-fluid">
                                                       {
                                                            (() => {
                                                                 if (lista_simulacros_usuario.length === 0) {
                                                                      return (
                                                                           <ThemeProvider theme={theme}>
                                                                                <CssBaseline />
                                                                                <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                                                                                     <h2 align="center">
                                                                                          ¡No te has presentado ningun simulacro! Registrate en una convocatoria primero y luego presenta un simulacro.
                                                                                     </h2>
                                                                                     <div className='mx-auto'>
                                                                                          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
                                                                                               <img className="" src={process.env.PUBLIC_URL + '/images/error.png'} alt="" height={200} />
                                                                                          </Grid>
                                                                                     </div>
                                                                                </Container>
                                                                           </ThemeProvider>
                                                                      )
                                                                 } else {
                                                                      return (
                                                                           <BootstrapTable 
                                                                                headerClasses='table-head'
                                                                                classes='table-design shadow'
                                                                                bootstrap4
                                                                                wrapperClasses='table-responsive'
                                                                                striped
                                                                                bordered
                                                                                hover
                                                                                keyField='id'
                                                                                data={handleBuscarU(lista_simulacros_usuario)}
                                                                                columns={columnasU}
                                                                                pagination={paginationFactory()}
                                                                                noDataIndication='No hay registros disponibles.' />
                                                                      )
                                                                 }
                                                            })()
                                                       }
                                                  </div>
                                             </>
                                        )
                                   } else {
                                        return (<Cargador />)
                                   }
                              })()
                         }
                    </div>
               </ResponsiveContainer >
          </React.Fragment >
     )
}

export default ListaSimulacrosE;