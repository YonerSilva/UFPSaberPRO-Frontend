import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import TableDesign from '../extra/Table';
import { ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';
import { Spinner } from 'react-bootstrap';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import IconButton from "@mui/material/IconButton";
import * as service from '../../store/services/ConvocatoriaService';
import {useAppContext} from '../../store/reducers/DatosGlobales';

const ListaConvocatorias = ()=>{

     const {state,setConvocatoriasPrg} = useAppContext();
     const [loading,setLoading] = useState(null);
     const [busqueda, setBusqueda] = useState("");
     const navigate = useNavigate();         

     const handleBuscar = (data) => {
          if (busqueda === "") {
               return state.lista_convocatorias_programa;
          } else {
               return data.filter(
                    (item) =>
                         item.simu_nombre.toString().toUpperCase().includes(busqueda.toUpperCase())
               );
          }
     }

     const getDatos = async()=>{
          const response = await service.getDatosGenerales();
          if(response.error!==null && response !== undefined){
               setConvocatoriasPrg(response.general);
          }
          setLoading(true);
     }

     const columnsIgnore = [
          "id_convocatoria",
          "usu_creacion",
          "programa",
          "usuarios"
     ]

     useEffect(()=>{
          getDatos();
     },[])

     return (
          <React.Fragment>
               <ResponsiveContainer>
                    <div className="container">
                         <Typography component="h2" variant="h5" color="dark" gutterBottom>
                              Lista de Convocatorias
                         </Typography>
                         {
                              (() => {
                                   if (state.lista_convocatorias_programa.length !== 0) {
                                        return (
                                             <nav className="navbar navbar-light bg-light rounded">
                                                  <div className="container-fluid">
                                                       <button type='button' onClick={() => { navigate('/UFPSaberPRO/convocatorias/crear_convocatorias') }} className='btn btn-danger m-2'>Crear Conovocatoria</button>
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
                                             if (state.lista_convocatorias_programa.length !== 0) {
                                                  return (
                                                       <div className='text-center'>
                                                            <h2>No hay datos.</h2>
                                                       </div>
                                                  )
                                             } else {
                                                  return (
                                                       <TableDesign columnCount={true} datos={handleBuscar(state.lista_convocatorias_programa)} columnsIgnore={columnsIgnore} columnOption={false}/>
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

export default ListaConvocatorias;