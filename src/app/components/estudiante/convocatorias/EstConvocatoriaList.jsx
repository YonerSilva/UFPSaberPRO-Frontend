import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';
import Barra from '../../extra/BarraBusqueda';
import Cargador from '../../extra/CargadorEventos';
import NoConvocatoria from './NoConvocatoria'
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch, useStore } from '../../../store/Provider/storeProvider';
import * as serviceConvocatoria from '../../../store/services/ConvocatoriaService';
import { alert_error, alert_loading, alert_success } from '../../../util/functions';

const ListaConvocatoriasUsuario = () => {

     const dispatch = useDispatch();
     const { lista_convocatorias_usuario, lista_convocatorias_activa } = useStore();
     const [loading, setLoading] = useState(true);
     const [busqueda, setBusqueda] = useState("");
     const navigate = useNavigate();

     const columnas = [
          {
               text: "NOMBRE",
               dataField: "convo_nombre",
               sort: true,
          },
          {
               text: "DESCRIPCION",
               dataField: "convo_descripcion",
               sort: true
          },
          {
               text: "FECHA INICIAL",
               dataField: "convo_fecha_inicial",
               align: 'center',
               sort: true,
               formatter: (cellContent, row) => {
                    if (row.convo_fecha_inicial !== null && row.convo_fecha_inicial !== undefined) {
                         const fecha = new Date(row.convo_fecha_inicial);
                         return <span>{fecha.toLocaleDateString()}<br />{fecha.toLocaleTimeString()}</span>
                    }
               }
          },
          {
               text: "FECHA FINAL",
               dataField: "convo_fecha_final",
               align: 'center',
               sort: true,
               formatter: (cellContent, row) => {
                    if (row.convo_fecha_final !== null && row.convo_fecha_final !== undefined) {
                         const fecha = new Date(row.convo_fecha_final);
                         return <span>{fecha.toLocaleDateString()}<br />{fecha.toLocaleTimeString()}</span>
                    }
               }
          },
          {
               text: "ESTADO",
               dataField: "convo_estado",
               align: 'center',
               sort: true,
               formatter: (cellContent, row) => {
                    switch (row.convo_estado) {
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
               text: "SIMULACRO",
               dataField: "convo_simulacro",
               isDummyField: true,
               formatter: (cellContent, row) => {
                    if (row.simulacro !== null && row.simulacro !== undefined) {
                         const fecha = new Date(row.simu_fecha_inicial);
                         return (
                              <span>
                                   Disponible
                                   <br />
                                   Fecha Inicio: {fecha.toLocaleDateString() + ' - ' + fecha.toLocaleTimeString()}
                                   <br />
                                   Duración: {row.simu_duracion}</span>
                         )
                    } else {
                         return <span>No disponible.</span>
                    }
               }
          },
          {
               text: "ACCIÓN",
               dataField: "fd1",
               isDummyField: true,
               formatter: (cellContent, row) => {
                    if (row.convo_estado === "A") {
                         return (
                              <div className='row-cols-2 row-cols-md-auto' align='center'>
                                   <IconButton onClick={() => { navigate() }} title='Ver Informacion de la Convocatoria' style={{ color: "blue" }}><VisibilityIcon /></IconButton>
                              </div>
                         )
                    }
               }
          }
     ]

     const listarConvocatoriasU = () => {
          try {
               serviceConvocatoria.getConvocatoriasUsuario().then(response => {
                    if (response.error === null) {
                         dispatch({
                              type: "SET_LISTA_CONVOCATORIAS_USUARIO",
                              payload: response.convocatorias
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

     const listarConvocatoriasA = () => {
          try {
               serviceConvocatoria.getConvocatoriasActivas().then(response => {
                    if (response.error === null) {
                         dispatch({
                              type: "SET_LISTA_CONOVOCATORIAS_ACTIVA",
                              payload: response.convocatorias
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

     const handleBuscarU = (data) => {
          if (busqueda === "") {
               return lista_convocatorias_usuario;
          } else {
               return data.filter(
                    (item) =>
                         item.convo_nombre.toString().toUpperCase().includes(busqueda.toUpperCase())
               );
          }
     }

     const handleBuscarA = (data) => {
          if (busqueda === "") {
               return lista_convocatorias_activa;
          } else {
               return data.filter(
                    (item) =>
                         item.convo_nombre.toString().toUpperCase().includes(busqueda.toUpperCase())
               );
          }
     }

     useEffect(() => {
          listarConvocatoriasU();
          listarConvocatoriasA();
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
                                                       Lista de Convocatorias Activas
                                                  </Typography>
                                                  {
                                                       (() => {
                                                            if (lista_convocatorias_activa.length !== 0) {
                                                                 return (
                                                                      <Barra
                                                                           input={<input onChange={(e) => { setBusqueda(e.target.value) }} title='Nombre Convocatoria' placeholder="Buscar Convocatoria" className="form-control me-2 border border-danger shadow" type="search" aria-label="Buscar" />}
                                                                      />
                                                                 )
                                                            }
                                                       })()
                                                  }
                                                  <hr />
                                                  <div className="container-fluid">
                                                       {
                                                            (() => {
                                                                 if (lista_convocatorias_activa.length === 0) {
                                                                      return (
                                                                           <NoConvocatoria />
                                                                      )
                                                                 } else {
                                                                      return (
                                                                           <BootstrapTable headerClasses='table-head'
                                                                                classes='table-design shadow'
                                                                                bootstrap4
                                                                                wrapperClasses='table-responsive'
                                                                                striped
                                                                                hover
                                                                                keyField='id_convocatoria'
                                                                                data={handleBuscarA(lista_convocatorias_activa)}
                                                                                columns={columnas}
                                                                                pagination={paginationFactory()}
                                                                                noDataIndication='No hay registros disponibles.' />
                                                                      )
                                                                 }
                                                            })()
                                                       }
                                                  </div>

                                                  <hr className="hr" />

                                                  <Typography component="h2" variant="h5" color="dark" gutterBottom>
                                                       Lista de Convocatorias Presentadas
                                                  </Typography>
                                                  {
                                                       (() => {
                                                            if (lista_convocatorias_usuario.length !== 0) {
                                                                 return (
                                                                      <Barra
                                                                           input={<input onChange={(e) => { setBusqueda(e.target.value) }} title='Nombre Convocatoria' placeholder="Buscar Convocatoria" className="form-control me-2 border border-danger shadow" type="search" aria-label="Buscar" />}
                                                                      />
                                                                 )
                                                            }
                                                       })()
                                                  }
                                                  <hr />
                                                  <div className="container-fluid">
                                                       {
                                                            (() => {
                                                                 if (lista_convocatorias_usuario.length === 0) {
                                                                      return (
                                                                           <NoConvocatoria />
                                                                      )
                                                                 } else {
                                                                      return (
                                                                           <BootstrapTable headerClasses='table-head'
                                                                                classes='table-design shadow'
                                                                                bootstrap4
                                                                                wrapperClasses='table-responsive'
                                                                                striped
                                                                                hover
                                                                                keyField='id_convocatoria'
                                                                                data={handleBuscarU(lista_convocatorias_usuario)}
                                                                                columns={columnas}
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

export default ListaConvocatoriasUsuario;