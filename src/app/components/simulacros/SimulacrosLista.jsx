import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';
import { Spinner } from 'react-bootstrap';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from "@mui/material/IconButton";
import * as service from '../../store/services/SimulacroService';
import { useAppContext } from '../../store/reducers/DatosGlobales';
import { alert_error } from '../../util/functions';

const ListaSimulacros = ()=>{

     const [simulacros, setSimulacros] = useState([]); 
     const { state,setSimulacrosPrg } = useAppContext();
     const [loading,setLoading] = useState(true);
     const [busqueda, setBusqueda] = useState("");
     const navigate = useNavigate();  

     const [datos, setDatos] = useState([]);


     const columnas = [
          {    
               text: "NOMBRE",
               dataField: "simu_nombre",
               sort: true
          },
          {
               text: "ACCIÓN",
               dataField: "fd1",
               isDummyField: true,
               formatter: (cellContent, row)=>{
                    return (
                         <button type='button' className='btn btn-danger'>{row.simu_nombre}</button>
                    )
               }
          }
     ]

     const handleBuscar = (data) => {
          if (busqueda === "") {
               return datos;
          } else {
               return data.filter(
                    (item) =>
                         item.simu_nombre.toString().toUpperCase().includes(busqueda.toUpperCase())
               );
          }
     }


     const getDatos = async()=>{
          try {
               const response = await service.getDatosGenerales();
               if (response.error === null) {
                    setSimulacros(response.general);
               } else {
                    alert_error("¡Error!", response.message);
               }
               setLoading(false);
          } catch (error) {
               console.error(error);
          }
     }


     useEffect(()=>{
          if(state.lista_simulacros_programa[0]===""){
               getDatos();
          }else{
               setSimulacros(state.lista_simulacros_programa);
               setLoading(false);
          }
     },[]);

     return (
          <React.Fragment>
               <ResponsiveContainer>
                    <div className="container">
                         <Typography component="h2" variant="h5" color="dark" gutterBottom>
                              Lista de Simulacros
                         </Typography>
                         {
                              (() => {
                                   if (simulacros.lengh !== 0) {
                                        return (
                                             <nav className="navbar navbar-light bg-light rounded">
                                                  <div className="container-fluid">
                                                       <button type='button' onClick={() => { navigate('/UFPSaberPRO/simulacros/crear_simulacro') }} className='btn btn-danger m-2'>Crear Simulacro</button>
                                                       <div className="d-flex">
                                                            <input onChange={(e) => { setBusqueda(e.target.value) }} title='Nombre Simulacro' placeholder="Buscar Simulacro" className="form-control me-2" type="search" aria-label="Buscar" />
                                                       </div>
                                                  </div>
                                             </nav> 
                                        )
                                   }
                              })()
                         }

                         <hr />
                         <div className="container-fluid">       
                              {
                                   (() => {
                                        if (loading) {
                                             if (simulacros.length === 0) {
                                                  return (
                                                       <div className='text-center'>
                                                            <h2>No hay datos.</h2>
                                                       </div>
                                                  )
                                             } else {
                                                  return (
                                                       <BootstrapTable bootstrap4 wrapperClasses='table-responsive' rowClasses="text-nowrap" striped bordered hover keyField='id_simulacro' data={handleBuscar(simulacros)} columns={columnas} pagination={paginationFactory()} noDataIndication='No hay registros disponibles.'/>
                                                  )
                                             }
                                        } else {
                                             return (
                                                  <div className='d-flex justify-content-center'>
                                                       <Spinner animation="border" variant='primary' size='' role="status" style={{ marginTop: '25%', marginBottom: '25%'}} />
                                                  </div>
                                             )
                                        }
                                   })()
                              }
                         </div>
                    </div>
               </ResponsiveContainer >
          </React.Fragment >
     )
}

export default ListaSimulacros;