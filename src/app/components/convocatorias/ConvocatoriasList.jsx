import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';
import Barra from '../extra/BarraBusqueda';
import { Button } from 'react-bootstrap';
import Cargador from '../extra/CargadorEventos';
import NoConvocatoria from '../convocatorias/NoConvocatoria'
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { IconButton } from '@mui/material';
import { useDispatch, useStore } from '../../store/Provider/storeProvider';
import * as serviceConvocatoria from '../../store/services/ConvocatoriaService';
import { alert_error, alert_loading, alert_success } from '../../util/functions';
import emailjs from 'emailjs-com';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Swal from 'sweetalert2';
import Form from 'react-bootstrap/Form';

const ListaConvocatorias = () => {

     const dispatch = useDispatch();
     const { lista_convocatorias_programa } = useStore();
     const [loading, setLoading] = useState(true);
     const [busqueda, setBusqueda] = useState("");
     const navigate = useNavigate();
     const [formCargar, setFormCargar] = useState(false);

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
                         const fecha_inicio = new Date(row.simu_fecha_inicial);
                         const fecha_final = new Date(row.simu_fecha_final);
                         return (
                              <span>
                                   Disponible
                                   <br />
                                   Fecha Inicio: {fecha_inicio.toLocaleDateString() + ' - ' + fecha_inicio.toLocaleTimeString()}
                                   <br />
                                   Fecha Final: {fecha_final.toLocaleDateString() + ' - ' + fecha_final.toLocaleTimeString()}
                              </span>
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
                                   <IconButton onClick={() => { updateConvocatoria(row) }} title='Actualizar Convocatoria' style={{ color: "blue" }}><EditIcon /></IconButton>
                                   <IconButton onClick={() => { listarEstudiantes(row) }} title='Ver estudiantes' style={{ color: "blue" }}><RecentActorsIcon /></IconButton>
                                   <IconButton onClick={() => { deleteConvocatoria(row) }} title='Eliminar Convocatoria' style={{ color: "red" }}><DeleteIcon /></IconButton>
                              </div>
                         )
                    } else {
                         return (
                              <div className='row-cols-2 row-cols-md-auto' align='center'>
                                   <IconButton onClick={() => { listarEstudiantes(row) }} title='Ver estudiantes' style={{ color: "blue" }}><RecentActorsIcon /></IconButton>
                                   <IconButton onClick={() => { cargarInvitaciones(row) }} title='Generar Invitaciones' style={{ color: "blue" }}><UploadFileIcon /></IconButton>
                              </div>
                         )
                    }
               }
          }
     ]


     // const cargarInvitaciones = async (item) => {
     //      await setFormCargar(true);
     //      window.location.href = "#list-item-1";
     // }

     const cargarInvitaciones = async (item) => {
          dispatch({
               type: "SET_FORM_EDITION",
               payload: item
          });
          navigate('/UFPSaberPRO/a/convocatorias/envio_invitaciones');
     }

     const subirArchivo = () => {
          try {
               let file = document.getElementById("formFile").files[0];
               let reader = new FileReader();
               reader.readAsText(file);
               reader.onload = function() {
                    console.log(reader.result);
                  };
                
                  reader.onerror = function() {
                    console.log(reader.error);
                  };
          } catch (error) {
               console.error(error);
          }
     }

     const listarEstudiantes = (item) => {
          dispatch({
               type: "SET_FORM_EDITION",
               payload: item
          });
          navigate('/UFPSaberPRO/a/convocatoria_estudiantes');
     }

     const updateConvocatoria = (item) => {
          dispatch({
               type: "SET_FORM_EDITION",
               payload: item
          });
          navigate('/UFPSaberPRO/a/convocatorias/crear_convocatorias');
     }

     const deleteConvocatoria = (item) => {
          try {
               Swal.fire({
                    title: 'Está seguro?',
                    text: "No se podrá revertir la acción!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#bb2d3b',
                    cancelButtonColor: '#bb2d3b',
                    confirmButtonText: 'ELIMINAR',
                    cancelButtonText: 'CANCELAR',
                    width: 300
               }).then((result) => {
                    if (result.isConfirmed) {
                         serviceConvocatoria.eliminar(item.id_convocatoria).then(response => {
                              if (response.error === null) {
                                   alert_success(response.message, "Se ha eliminado la convocatoria.");
                                   listarConvocatorias();
                              } else {
                                   alert_error("¡Error!", response.message);
                              }
                         });
                    }
               })
          } catch (error) {
               console.error(error);
          }
     }

     const listarConvocatorias = (response) => {
          try {
               serviceConvocatoria.getDatosGenerales().then(response => {
                    if (response.error === null) {
                         dispatch({
                              type: "SET_LISTA_CONVOCATORIAS_PRG",
                              payload: response.general
                         });
                         alert_loading(response.message);
                    } else {
                         alert_error("¡Error!", response.message);
                    }
               });
          } catch (error) {
               console.error(error);
          }
     }

     const handleBuscar = (data) => {
          if (busqueda === "") {
               return lista_convocatorias_programa;
          } else {
               return data.filter(
                    (item) =>
                         item.convo_nombre.toString().toUpperCase().includes(busqueda.toUpperCase())
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
                              Lista de Convocatorias
                         </Typography>
                         {
                              (() => {
                                   if (lista_convocatorias_programa.length !== 0) {
                                        return (
                                             <Barra
                                                  button={<button type='button' onClick={() => { navigate('/UFPSaberPRO/a/convocatorias/crear_convocatorias') }} className='btn btn-danger m-2'>Crear Convocatoria</button>}
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
                                             if (lista_convocatorias_programa.length === 0) {
                                                  return (
                                                       <NoConvocatoria />
                                                  )
                                             } else {
                                                  return (
                                                       <div>
                                                            <BootstrapTable headerClasses='table-head'
                                                                 classes='table-design shadow'
                                                                 bootstrap4
                                                                 wrapperClasses='table-responsive'
                                                                 striped
                                                                 hover
                                                                 keyField='id_convocatoria'
                                                                 data={handleBuscar(lista_convocatorias_programa)}
                                                                 columns={columnas}  
                                                                 pagination={paginationFactory()}
                                                                 noDataIndication='No hay registros disponibles.' />
                                                            {
                                                                 formCargar
                                                                      ?
                                                                      <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
                                                                           <Form.Group controlId="formFile" className="mb-3" id="list-item-1">
                                                                                <Form.Label style={{ fontWeight: 1000, fontSize: 25 }}>SUBE EL ARCHIVO CON LA INFORMACION ⬇️ </Form.Label>
                                                                                <Form.Control type="file" accept=".csv, .xls, .xlt, .xla" />
                                                                                <Button onClick={() => { subirArchivo() }} size="large" className="btn btn-danger m-2">
                                                                                     Cargar
                                                                                </Button>
                                                                           </Form.Group>
                                                                      </div>
                                                                      :
                                                                      <></>
                                                            }
                                                       </div>
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