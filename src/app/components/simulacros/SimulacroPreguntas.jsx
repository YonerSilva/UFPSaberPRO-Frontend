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
import Paper from "@mui/material/Paper";
import { useDispatch, useStore } from '../../store/Provider/storeProvider';
import DeleteIcon from '@mui/icons-material/Delete';
import * as serviceSimulacro from '../../store/services/SimulacroService';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { alert_error, alert_loading } from '../../util/functions';
import NoPreguntas from '../preguntas/NoPreguntas';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from '@material-ui/core/Checkbox';

const SimulacroPreguntasList = () => {
     const dispatch = useDispatch();
     const { formEditionSimu, lista_categorias_programa, lista_subcategorias_programa } = useStore();
     const [preguntas, setPreguntas] = useState([]);
     const [busqueda, setBusqueda] = useState("");
     const [loading, setLoading] = useState(true);
     const navigate = useNavigate();
     const [subcategorias, setSubcategorias] = useState([]);
     const [datos, setDatos] = useState({
          categoria: "",
          id_subcategoria: ""
     });

     const columnas = [
          {
               text: "DESCRIPCION",
               dataField: "preg_descripcion",
               align: "center",
               sort: true,
          },
          {
               text: "SUBCATEGORIA",
               dataField: "preg_subcategoria",
               align: "center",
               isDummyField: true,
               formatter: (cellContent, row) => {
                    return row.subcategoria.sub_nombre;
               }
          },
          {
               text: "IMAGEN",
               dataField: "preg_imagen",
               align: "center",
               isDummyField: true,
               formatter: (cellContent, row) => {
                    if (row.preg_imagen !== null && row.preg_imgane !== "") {
                         return <span>imagen</span>
                    }
               }
          },
          {
               text: "ESTADO",
               dataField: "preg_estado",
               align: 'center',
               sort: true,
               formatter: (cellContent, row) => {
                    switch (row.preg_estado) {
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
                    if (row.preg_estado === 'I') {
                         return (
                              <div className="row-cols-2 row-cols-md-auto" align="center">
                                   <IconButton onClick={() => { updatePregunta(row) }} title='Actualizar Pregunta' style={{ color: "blue" }}><EditIcon /></IconButton>
                                   <IconButton title='Eliminar Pregunta' style={{ color: "red" }}> <DeleteIcon /></IconButton>
                                   <IconButton onClick={() => { verOpciones(row) }} title="Ver Opciones" style={{ color: "gray" }}><VisibilityIcon /></IconButton>
                              </div>
                         )
                    } else {
                         return (
                              <IconButton onClick={() => { verOpciones(row) }} title="Ver Opciones" style={{ color: "gray" }}><VisibilityIcon /></IconButton>
                         )
                    }
               },
          },
          {
               text: "SELECCIONAR",
               dataField: "simu_preg",
               align: 'center',
               formatter: (cellCotent, row) => {
                    return (
                         <div className="row-cols-2 row-cols-md-auto" align="center">
                              <Checkbox
                                   defaultChecked
                                   color="primary"
                                   inputProps={{ 'aria-label': 'secondary checkbox' }}
                              />
                         </div>)
               }
          }
     ];

     const handleChange = (e) => {
          const name = e.target.name;
          const value = e.target.value;
          setDatos(prev => ({ ...prev, [name]: value }));
          if (name === "categoria") {
               if (value === "") {
                    setSubcategorias([]);
               } else {
                    if (lista_subcategorias_programa.length !== 0) {
                         const subs = lista_subcategorias_programa.filter(item => parseInt(item.categoria) === parseInt(value));
                         setSubcategorias(subs);
                    }
               }
          }
     };

     const updatePregunta = (item) => {
          dispatch({
               type: "SET_FORM_EDITION",
               payload: item
          });
          navigate('/UFPSaberPRO/preguntas/crear_pregunta');
     }

     const listarPreguntas = () => {
          try {
               serviceSimulacro.getPreguntasDiferentes(formEditionSimu.id_simulacro).then(response => {
                    if (response.error === null) {
                         alert_loading(response.message);
                         setPreguntas(response.preguntas);
                    } else {
                         alert_error("¡Error!", response.message);
                    }
                    setLoading(false);
               });
          } catch (error) {
               console.error(error);
          }
     }

     const verOpciones = (item) => {
          dispatch({
               type: "SET_FORM_EDITION_PREG",
               payload: item
          });
          navigate('/UFPSaberPRO/pregunta/opciones');
     }

     const handleBuscar = (data) => {
          if (busqueda === "") {
               return preguntas;
          } else {
               return data.filter((item) =>
                    item.preg_descripcion
                         .toString()
                         .toUpperCase()
                         .includes(busqueda.toUpperCase())
               );
          }
     };

     const handleFiltrarPreguntasSub = (data) => {
          if (datos.id_subcategoria === "") {
               return preguntas;
          } else {
               return data.filter((item) =>
                    item.id_subcategoria
                         .toString()
                         .toUpperCase()
                         .includes(datos.id_subcategoria)
               );
          }
     };

     useEffect(() => {
          if (Object.keys(formEditionSimu).length === 0 || formEditionSimu.id_simulacro === undefined) {
               navigate('/UFPSaberPRO/simulacros');
          } else {
               listarPreguntas();
          }
     }, []);

     return (
          <React.Fragment>
               <ResponsiveContainer>
                    <div className="container">
                         <Typography component="h2" variant="h5" color="dark" gutterBottom>
                              Lista de Preguntas del Simulacro
                         </Typography>
                         {(() => {
                              if (preguntas.length !== 0) {
                                   return (
                                        <Barra
                                             input={<input onChange={(e) => { setBusqueda(e.target.value) }} title="Nombre Pregunta" placeholder="Buscar Pregunta" className="form-control me-2" type="search" aria-label="Buscar" />}
                                        />
                                   );
                              }
                         })()}

                         <hr />
                         <div className="container-fluid">
                              {(() => {
                                   if (!loading) {
                                        if (preguntas.length === 0) {
                                             return <NoPreguntas />;
                                        } else {
                                             return (
                                                  <>
                                                       <Paper
                                                            variant="outlined"
                                                            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                                                       >
                                                            <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
                                                                 <Grid item xs={12}>
                                                                      <TextField
                                                                           id="categoria"
                                                                           name="categoria"
                                                                           label="Categoria"
                                                                           required
                                                                           select
                                                                           value={datos.categoria}
                                                                           onChange={handleChange}
                                                                           fullWidth
                                                                           variant="outlined"
                                                                      >
                                                                           {lista_categorias_programa.map((categoria) => (
                                                                                <MenuItem key={categoria.id_categoria} value={categoria.id_categoria}>
                                                                                     {categoria.cate_nombre}
                                                                                </MenuItem>
                                                                           ))}
                                                                      </TextField>
                                                                 </Grid>
                                                                 {
                                                                      datos.categoria !== ""
                                                                           ?
                                                                           <Grid item xs={12}>
                                                                                <TextField
                                                                                     id="subcategoria"
                                                                                     name="id_subcategoria"
                                                                                     label="Subcategorias"
                                                                                     required
                                                                                     select
                                                                                     value={datos.id_subcategoria}
                                                                                     onChange={handleChange}
                                                                                     fullWidth
                                                                                     variant="outlined"
                                                                                >
                                                                                     {subcategorias.map((subcategoria) => (
                                                                                          <MenuItem key={subcategoria.id_subcategoria} value={subcategoria.id_subcategoria}>
                                                                                               {subcategoria.sub_nombre}
                                                                                          </MenuItem>
                                                                                     ))}
                                                                                </TextField>
                                                                           </Grid>
                                                                           :
                                                                           <></>
                                                                 }
                                                            </Grid>
                                                            <BootstrapTable
                                                                 headerClasses="table-head"
                                                                 classes="table-design shadow"
                                                                 bootstrap4
                                                                 wrapperClasses="table-responsive"
                                                                 striped
                                                                 bordered
                                                                 hover
                                                                 keyField="id_pregunta"
                                                                 data={handleFiltrarPreguntasSub()}
                                                                 columns={columnas}
                                                                 pagination={paginationFactory()}
                                                                 noDataIndication="No hay registros disponibles."
                                                            />
                                                       </Paper>
                                                  </>
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

export default SimulacroPreguntasList;