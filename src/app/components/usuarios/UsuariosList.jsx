import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import Barra from '../extra/BarraBusqueda';
import { useDispatch, useStore } from '../../store/Provider/storeProvider';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Cargador from '../extra/CargadorEventos';
import NoUser from './NoUser';


import IconButton from "@mui/material/IconButton";

const ListaUsuarios = ()=>{

     const dispatch = useDispatch();
     const { lista_usuarios_programa } = useStore();
     const [loading, setLoading] = useState(true);
     const [busqueda, setBusqueda] = useState("");
     const navigate = useNavigate();  
     
     const columnas = [
          {
               text: "NOMBRE",
               dataField: "usu_nombre",
               align: 'center',
               sort: true,
          },
          {
               text: "APELLIDO",
               dataField: "usu_apellido",
               align: 'center',
               sort: true
          },
          {
               text: "CODIGO",
               dataField: "usu_codigo",
               align: 'center',
               sort: true,
          },
          {
               text: "EMAIL",
               dataField: "usu_email",
               align: 'center',
               sort: true,
               formatter: (cellContent, row) => {
                    return <a href={"mailto:"+row.usu_email}>{row.usu_email}</a>
               }
          },
          {
               text: "PROGRAMA",
               dataField: "cod_programa",
               align: 'center',
               sort: true,
          },
          {
               text: "ROL",
               dataField: "rol",
               align: 'center',
               sort: true,
               formatter: (cellContent, row) => {
                    switch (row.rol) {
                         case 1:
                              return <span>ADMIN</span>
                         case 2:
                              return <span>DOCENTE</span>
                         case 3:
                              return <span>ESTUDIANTE</span>
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
                         return (
                              <div className='row-cols-2 row-cols-md-auto' align='center'>
                                   <IconButton onClick={() => { updateUsuario(row) }} title='Actualizar Convocatoria' style={{ color: "blue" }}><EditIcon /></IconButton>
                              </div>
                         )
               }
          }
     ]

     const updateUsuario = (item) => {
          dispatch({
               type: "SET_FORM_EDITION",
               payload: item
          });
          navigate('/UFPSaberPRO/editar-usuarios');
     }

     const handleBuscar = (data) => {
          if (busqueda === "") {
               return lista_usuarios_programa;
          } else {
               return data.filter(
                    (item) =>
                         item.usu_nombre.toString().toUpperCase().includes(busqueda.toUpperCase())
               );
          }
     }

     useEffect(() => {
          setLoading(false);
     }, []);

     return (
          <React.Fragment>
               <ResponsiveContainer>
                    <div className="container">
                         <Typography component="h2" variant="h5" color="dark" gutterBottom>
                              Lista de Usuarios
                         </Typography>
                         {
                              (() => {
                                   if (lista_usuarios_programa.length !== 0) {
                                        return (
                                             <Barra
                                                  input={<input onChange={(e) => { setBusqueda(e.target.value) }} title='Nombre Usuario' placeholder="Buscar Usuario" className="form-control me-2 border border-danger shadow" type="search" aria-label="Buscar" />}
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
                                             if (lista_usuarios_programa.length === 0) {
                                                  return (
                                                       <NoUser/>
                                                  )
                                             } else {
                                                  return (
                                                       <BootstrapTable headerClasses='table-head' 
                                                            classes='table-design shadow' 
                                                            bootstrap4 
                                                            wrapperClasses='table-responsive' 
                                                            striped 
                                                            hover 
                                                            keyField='id_usuario' 
                                                            data={handleBuscar(lista_usuarios_programa)} 
                                                            columns={columnas} 
                                                            pagination={paginationFactory()} 
                                                            noDataIndication='No hay usuarios disponibles.'/>
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

export default ListaUsuarios;