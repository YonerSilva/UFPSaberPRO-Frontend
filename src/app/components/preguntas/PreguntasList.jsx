import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import Barra from '../extra/BarraBusqueda';
import Cargador from "../extra/CargadorEventos";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import { useDispatch, useStore } from '../../store/Provider/storeProvider';
import DeleteIcon from '@mui/icons-material/Delete';
import * as servicePregunta from '../../store/services/PreguntasService';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { alert_error, alert_loading, alert_success } from '../../util/functions';
import NoCate from "../CategoriasySubcategorias/NoCate";

const PreguntasList = () => {
     const dispatch = useDispatch();
     const [busqueda, setBusqueda] = useState("");
     const [loading, setLoading] = useState(true);
     const navigate = useNavigate();

     const lista_preguntas_programa =[  
          {
               id_pregunta:1, 
               preg_imagen:"", 
               preg_descripcion: "hola zorras",
               preg_estado: "I",
          }
     ]

     const columnas = [
          {
               text: "DESCRIPCION",
               dataField: "preg_descripcion",
               align: "center",
               sort: true,
          },
          {
               text: "ESTADO",
               dataField: "preg_estado",
               align: "center",
               sort: true,
          },
          {
               text: "ACCIÓN",
               dataField: "fd1",
               isDummyField: true,
               formatter: (cellContent, row) => {
                    return (
                         <div className="row-cols-2 row-cols-md-auto" align="center">
                              <IconButton onClick={() => { updatePregunta(row) }}
                                   title='Actualizar Pregunta'
                                   style={{ color: "blue" }}><EditIcon />
                              </IconButton>
                              <IconButton
                                   onClick={() => { verPreguntas(row) }}
                                   title="Ver Pregunta"
                                   style={{ color: "gray" }}
                              >
                                   <VisibilityIcon />
                              </IconButton>
                              <IconButton
                                   title='Eliminar Pregunta'
                                   style={{ color: "red" }}>
                                   <DeleteIcon />
                              </IconButton>
                         </div>
                    );
               },
          },
     ];

     const updatePregunta = (item) => {
          dispatch({
               type: "SET_FORM_EDITION",
               payload: item
          });
          navigate('/UFPSaberPRO/preguntas/crear_pregunta');
     }

     const listarPreguntas = (response) => {
          try {
               servicePregunta.getDatosGenerales().then(response => {
                    if (response.error === null) {
                         dispatch({
                              type: "SET_LISTA_PREGUNTAS_PRG",
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

     const verPreguntas = (item) => {
          navigate('/UFPSaberPRO/preguntas/');
     }

     const handleBuscar = (data) => {
          if (busqueda === "") {
               return lista_preguntas_programa;
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
          setLoading(false);
     }, []);

     return (
          <React.Fragment>
               <ResponsiveContainer>
                    <div className="container">
                         <Typography component="h2" variant="h5" color="dark" gutterBottom>
                              Lista de Preguntas
                         </Typography>
                         {(() => {
                              if (lista_preguntas_programa.length !== 0) {
                                   return (
                                        <Barra
                                             button={<button type="button" onClick={() => { navigate("/UFPSaberPRO/preguntas/crear_pregunta") }} className="btn btn-danger m-2">Crear Pregunta</button>}
                                             input={<input onChange={(e) => { setBusqueda(e.target.value) }} title="Nombre Simulacro" placeholder="Buscar Pregunta" className="form-control me-2" type="search" aria-label="Buscar" />}
                                        />
                                   );
                              }
                         })()}

                         <hr />
                         <div className="container-fluid">
                              {(() => {
                                   if (!loading) {
                                        if (lista_preguntas_programa.length === 0) {
                                             return <NoCate />;
                                        } else {
                                             return (
                                                  <BootstrapTable
                                                       headerClasses="table-head"
                                                       classes="table-design shadow"
                                                       bootstrap4
                                                       wrapperClasses="table-responsive"
                                                       striped
                                                       bordered
                                                       hover
                                                       keyField="id_pregunta"
                                                       data={handleBuscar(lista_preguntas_programa)}
                                                       columns={columnas}
                                                       pagination={paginationFactory()}
                                                       noDataIndication="No hay registros disponibles."
                                                  />
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

export default PreguntasList;