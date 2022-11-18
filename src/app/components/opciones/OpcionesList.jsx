import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import { Button, Form } from "react-bootstrap";
import Barra from '../extra/BarraBusqueda';
import Cargador from "../extra/CargadorEventos";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import { useDispatch, useStore } from '../../store/Provider/storeProvider';
import DeleteIcon from '@mui/icons-material/Delete';
import * as serviceOpcion from '../../store/services/OpcionService';
import { alert_error, alert_loading } from '../../util/functions';
import NoOpciones from './NoOpciones';
import Grid from "@mui/material/Grid";

const OpcionesList = () => {
     const dispatch = useDispatch();
     const { formEditionPreg } = useStore();
     const [opciones, setOpciones] = useState([]);
     const [busqueda, setBusqueda] = useState("");
     const [loading, setLoading] = useState(true);
     const navigate = useNavigate();

     const columnas = [
          {
               text: "DESCRIPCION",
               dataField: "opc_descripcion",
               align: "center",
               sort: true,
          },
          {
               text: "ACCIÓN",
               dataField: "fd1",
               isDummyField: true,
               formatter: (cellContent, row) => {
                    if (formEditionPreg.preg_estado === 'I') {
                         return (
                              <div className="row-cols-2 row-cols-md-auto" align="center">
                                   <IconButton onClick={() => { updateOpcion(row) }} title='Actualizar Opcion' style={{ color: "blue" }}><EditIcon /></IconButton>
                                   <IconButton title='Eliminar Opcion' style={{ color: "red" }}> <DeleteIcon /></IconButton>
                              </div>
                         )
                    }
               },
          },
     ];

     const updateOpcion = (item) => {
          dispatch({
               type: "SET_FORM_EDITION_OPC",
               payload: item
          });
          navigate('/UFPSaberPRO/opciones/crear_opcion');
     }

     const listarOpciones = () => {
          try {
               const id_pregunta = formEditionPreg.id_pregunta;
               serviceOpcion.getOpcionesPregunta(id_pregunta).then(response => {
                    if (response.error === null) {
                         setOpciones(response.opciones);
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
               return opciones;
          } else {
               return data.filter((item) =>
                    item.opc_descripcion
                         .toString()
                         .toUpperCase()
                         .includes(busqueda.toUpperCase())
               );
          }
     };

     useEffect(() => {
          if (Object.keys(formEditionPreg).length === 0 || formEditionPreg.id_pregunta === undefined) {
               navigate('/UFPSaberPRO/preguntas');
          } else {
               listarOpciones();
          }
     }, []);

     return (
          <React.Fragment>
               <ResponsiveContainer>
                    <div className="container">
                         <Typography component="h2" variant="h5" color="dark" gutterBottom>
                              Lista de Opciones
                         </Typography>
                         {(() => {
                              if (opciones.length !== 0) {
                                   return (
                                        <Barra
                                             button={<button type="button" onClick={() => { navigate("/UFPSaberPRO/opciones/crear_opcion") }} className="btn btn-danger m-2">Crear Opcion</button>}
                                             input={<input onChange={(e) => { setBusqueda(e.target.value) }} title="Nombre Opcion" placeholder="Buscar Opcion" className="form-control me-2" type="search" aria-label="Buscar" />}
                                        />
                                   );
                              }
                         })()}

                         <hr />
                         <div className="container-fluid">
                              {(() => {
                                   if (!loading) {
                                        if (opciones.length === 0) {
                                             return <NoOpciones />;
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
                                                       keyField="id_opcion"
                                                       data={handleBuscar(opciones)}
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
                         <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
                              <Button onClick={() => { navigate(-1) }} size="large" className="btn-v btn-danger m-2">
                                   Volver
                              </Button>
                         </Grid >
                    </div>
               </ResponsiveContainer>
          </React.Fragment>
     );
};

export default OpcionesList;