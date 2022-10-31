import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import TableDesign from '../extra/Table';
import { ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';
import { Spinner } from 'react-bootstrap';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import IconButton from "@mui/material/IconButton";

const PreguntasList = ()=>{

     const [loading,setLoading] = useState(null);
     const [datos, setDatos] = useState([]);
     const [busqueda, setBusqueda] = useState("");
     const navigate = useNavigate();         

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
          await setTimeout(()=>{
               setDatos([{
                "id_simulacro": 1,
                "Descripcion": "Leer cuento",
                "Subcategoria:": "Lectura Critica",
                "Tipo de Pregunta": "Seleccion Multiple",
               "Acciones": <><IconButton><EditIcon/></IconButton> <IconButton><DeleteForeverIcon/></IconButton></>
          }
          ]);
          setLoading(true);
     }, 5000);
     }
     const columnsIgnore = [
          "id_simulacro"
     ]

     useEffect(()=>{
          getDatos();
     },[])

     return (
          <React.Fragment>
               <ResponsiveContainer>
                    <div className="container">
                         <Typography component="h2" variant="h5" color="dark" gutterBottom>
                              Lista de Preguntas
                         </Typography>
                         {
                              (() => {
                                   if (datos.lengh !== 0) {
                                        return (
                                             <nav className="navbar navbar-light bg-light rounded">
                                                  <div className="container-fluid">
                                                       <button type='button' onClick={() => { navigate('/UFPSaberPRO/preguntas/crear_preguntas') }} className='btn btn-danger m-2'>Crear Pregunta</button>
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
                                             if (datos.length === 0) {
                                                  return (
                                                       <div className='text-center'>
                                                            <h2>No hay datos.</h2>
                                                       </div>
                                                  )
                                             } else {
                                                  return (
                                                       <TableDesign columnCount={true} datos={handleBuscar(datos)} columnsIgnore={columnsIgnore} columnOption={false}/>
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

export default PreguntasList;