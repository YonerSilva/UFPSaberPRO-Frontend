import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';
import * as service from '../../store/services/ConvocatoriaService';
import { useAppContext } from '../../store/reducers/DatosGlobales';
import { alert_error } from '../../util/functions';
import Barra from '../extra/BarraBusqueda';
import Cargador from '../extra/CargadorEventos';
import NoConvocatoria from '../convocatorias/NoConvocatoria'
import { IconButton } from '@mui/material';
import { red } from '@mui/material/colors';

const ListaConvocatorias = () => {

     const { state, setConvocatoriasPrg, setSimulacrosPrg } = useAppContext();
     const [convocatorias, setConvocatorias] = useState([]);
     const [simulacros, setSimulacros] = useState([]);
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
                    if(row.convo_fecha_inicial!==null && row.convo_fecha_inicial!==undefined){
                         const fecha = new Date(row.convo_fecha_inicial);
                         return <span>{fecha.toLocaleDateString()}<br/>{fecha.toLocaleTimeString()}</span>
                    }
               }
          },
          {
               text: "FECHA FINAL",
               dataField: "convo_fecha_final",
               align: 'center',
               sort: true,
               formatter: (cellContent, row) => {
                    if(row.convo_fecha_final!==null && row.convo_fecha_final!==undefined){
                         const fecha = new Date(row.convo_fecha_final);
                         return <span>{fecha.toLocaleDateString()}<br/>{fecha.toLocaleTimeString()}</span>
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
               align: 'center',
               formatter: (cellContent, row) => {
                    if (row.simulacro !== null && row.simulacro !== undefined) {
                         return (
                              <a type='button' onClick={()=>{}}>{row.simulacro.simu_nombre}</a>
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
                    if (row.convo_estado === "I") {
                         return (
                              <div className='row-cols-2 row-cols-md-auto' align='center'>
                                   <IconButton onClick={() => { navigate() }} title='Actualizar Convocatoria' style={{ color: "blue" }}><EditIcon /></IconButton>
                                   <IconButton onClick={() => { navigate() }} title='Eliminar Convocatoria' style={{ color: "red" }}><DeleteIcon /></IconButton>
                              </div>
                         )
                    }
               }
          }
     ]

     const handleBuscar = (data) => {
          if (busqueda === "") {
               return convocatorias;
          } else {
               return data.filter(
                    (item) =>
                         item.convo_nombre.toString().toUpperCase().includes(busqueda.toUpperCase())
               );
          }
     }

     const getDatos = async () => {
          try {
               const response = await service.getDatosGenerales();
               if (response.error === null) {
                    setConvocatoriasPrg(response.general);
                    setSimulacrosPrg(response.general);
                    setSimulacros(response.general.simulacros_programa);
                    setConvocatorias(response.general.convocatorias_programa);
               } else {
                    alert_error("¡Error!", response.message);
               }
               setLoading(false);
          } catch (error) {
               console.error(error);
          }
     }

     useEffect(() => {
          if (state.lista_convocatorias_programa[0] === "" || state.lista_simulacros_programa[0] === "") {
               getDatos();
          } else {
               setConvocatorias(state.lista_convocatorias_programa);
               setSimulacros(state.lista_simulacros_programa);
               setLoading(false);
          }
     }, []);

     return (
          <React.Fragment>
               <ResponsiveContainer>
                    <div className="container">
                         <Typography component="h2" variant="h5" color="dark" gutterBottom>
                              Lista de Convocatorias
                         </Typography>
                         {
                              (() => {
                                   if (convocatorias.length !== 0) {
                                        return (
                                             <Barra
                                                  button={<button type='button' onClick={() => { navigate('/UFPSaberPRO/convocatorias/crear_convocatorias') }} className='btn btn-danger m-2'>Crear Convocatoria</button>}
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
                                        if (!loading) {
                                             if (convocatorias.length === 0) {
                                                  return (
                                                       <NoConvocatoria />
                                                  )
                                             } else {
                                                  return (
                                                       <BootstrapTable headerClasses='table-head' classes='table-design shadow' bootstrap4 wrapperClasses='table-responsive' striped hover keyField='id_convocatoria' data={handleBuscar(convocatorias)} columns={columnas} pagination={paginationFactory()} noDataIndication='No hay registros disponibles.'/>
                                                  )
                                             }
                                        } else {
                                             return (<Cargador />)
                                        }
                                   })()
                              }
                         </div>
                    </div>
               </ResponsiveContainer >
          </React.Fragment >
     )
}

export default ListaConvocatorias;